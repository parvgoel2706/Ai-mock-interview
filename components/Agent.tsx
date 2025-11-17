"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
// Using workflow-only integration; assistant config not used directly
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    setErrorMessage(""); // Clear previous errors

    try {
      // Try assistant ID first (for direct voice calls), fallback to workflow ID
      const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
      const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
      
      const vapiId = assistantId || workflowId;

      if (!vapiId) {
        const errorMsg = "Missing Vapi configuration. Please set NEXT_PUBLIC_VAPI_ASSISTANT_ID or NEXT_PUBLIC_VAPI_WORKFLOW_ID in .env.local";
        console.error(errorMsg);
        setErrorMessage(errorMsg);
        setCallStatus(CallStatus.INACTIVE);
        return;
      }

      console.log(`Starting call with ${assistantId ? 'Assistant' : 'Workflow'} ID:`, vapiId);

      // Validate UUID format
      if (!/^[a-f0-9-]{36}$/i.test(vapiId)) {
        console.warn(
          "Vapi ID does not match expected UUID format. This may cause issues."
        );
      }

      // Prepare variables based on call type
      let variableValues: Record<string, string> = {
        username: userName || "User",
        userid: userId || "unknown",
      };

      // Add questions for interview mode (not generate mode)
      if (type !== "generate" && questions) {
        const formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
        variableValues.questions = formattedQuestions;
      }

      console.log("Starting call with variables:", variableValues);

      await vapi.start(vapiId, {
        variableValues,
      });
    } catch (err: any) {
      console.error("Failed to start call:", err);
      
      // Extract detailed error from Vapi response
      let errorDetail = "Failed to start call. Please check your configuration.";
      
      if (err?.error?.message) {
        errorDetail = err.error.message;
      } else if (err?.message) {
        errorDetail = err.message;
      }
      
      console.error("Vapi Error Details:", {
        status: err?.status,
        statusCode: err?.error?.statusCode,
        message: err?.error?.message,
        error: err?.error?.error,
        fullError: err
      });
      
      setErrorMessage(errorDetail);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <>
      <div className="call-view">
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card */}
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="profile-image"
              width={539}
              height={539}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="transcript-border">
          <div className="transcript" style={{ color: "#ef4444" }}>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      {messages.length > 0 && !errorMessage && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
