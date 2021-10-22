import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { db, storage } from "../../firebase";
import { getSession } from "next-auth/react";

export default async function likeAPI(req, res) {
  const { caption, selectedFile } = req.body;
  const session = await getSession({ req });

  // 1) Create a post and add to firestore
  // 2) get the post ID for the newly created post
  // 3) upload the image to firebase storage with the post ID
  // 4) get a download URL from firebase storage and update to original post with image

  try {
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    res.status(200).json({ msg: "Uploaded" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}
