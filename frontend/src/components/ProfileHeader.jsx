import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import styles from "./ProfileHeader.module.css";
import PageLoader from "./PageLoader.jsx";

function ProfileHeader() {
    const { logout, authUser, updateProfile, isLoggingIn } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    return (
        <>
            {isLoggingIn ? <PageLoader /> : <></>}
            <div className={styles.profileContainer}>

                <div className={styles.pfpAndOnline}>
                    {/* AVATAR */}
                    <button onClick={() => fileInputRef.current.click()} className={styles.pfpButton}>
                        <img
                            className={styles.pfp}
                            src={selectedImg || authUser.profilePic || "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"}
                            alt="User image"
                        />
                    </button>
                    {/* FILE UPLOAD HIDDEN input*/}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        hidden={true}
                    />
                    <p className={styles.online}>Online</p>
                </div>
                {/*USERNAME*/}

                <p className={styles.username}>{authUser?.fullName || "Loading ..."}</p>

                <button onClick={logout} className={styles.logout}>
                    Log out
                </button>
            </div>
        </>
    );
}
export default ProfileHeader;