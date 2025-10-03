import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useToastStore } from "../store/useToastStore";
import styles from "./MessageInput.module.css"


function MessageInput() {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const fileInputRef = useRef(null);
    const addToast = useToastStore.getState().addToast;

    const { sendMessage } = useChatStore();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        sendMessage({
            text: text.trim(),
            image: imagePreview,
        });
        setText("");
        setImagePreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type?.startsWith("image/")) {
            addToast("Please select an image file", "error");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div>
            {imagePreview && (
                <div>
                    <div className={styles.imagePreviewBlock}>
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className={styles.imagePreview}
                        />
                        <button
                            className={styles.removeImg}
                            onClick={removeImage}
                            type="button"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} >
                <div className={styles.inputForm}>
                    <input
                        className={styles.textField}
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        placeholder="Type your message..."
                    />

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        hidden={true}
                    />

                    <button className={styles.imageSelect}
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        IMG
                    </button>
                    <button
                        className={styles.send}
                        type="submit"
                        disabled={!text.trim() && !imagePreview}
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
export default MessageInput;