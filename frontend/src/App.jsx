import "./App.css";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const ENDPOINT = "http://localhost:3000";

function App() {
    const { messages, sendMessage, error, status } = useChat({
        transport: new DefaultChatTransport({
            api: `${ENDPOINT}`,
            prepareSendMessagesRequest: ({ messages }) => {
                console.log("Sending messages:", messages);
                return {
                    body: {
                        messages: messages,
                    },
                };
            },
        }),
    });

    return (
        <div className="app">
            <h1 className="heading">Welcome to your chat app</h1>
            <div className="chatapp">
                <div className="message-box">
                    {messages.map((message) => (
                        <div key={message.id}>
                            <div>
                                {message.role === "user" ? "You: " : "AI: "}
                            </div>
                            <p>
                                {message.parts.map((part, index) =>
                                    part.type === "text" ? (
                                        <span key={index}>{part.text}</span>
                                    ) : null
                                )}
                            </p>
                        </div>
                    ))}
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage({
                            text: e.currentTarget["input-prompt"].value,
                            role: "user",
                        });
                        e.currentTarget.reset();
                    }}
                    className="inputform"
                >
                    <input type="text" name="message" id="input-prompt" />
                    <button type="submit" disabled={status === "streaming"}>
                        Send
                    </button>
                </form>
                {error && (
                    <p className="errorbox">
                        Error. Please check browser console and the terminal for
                        error messages.
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;
