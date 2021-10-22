import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../../firebase";
import { getSession } from "next-auth/react";

export default async function addCommentAPI(req, res) {
  const { id, commentToSend } = req.body;
  const session = await getSession({ req });

  try {
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });

    res.status(200).json({ msg: "Added comment" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}
