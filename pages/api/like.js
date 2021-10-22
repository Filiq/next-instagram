import { doc, setDoc, deleteDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import { getSession } from "next-auth/react";

export default async function likeAPI(req, res) {
  const { id, hasLiked } = req.body;
  const session = await getSession({ req });

  try {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }

    res.status(200).json({ msg: hasLiked ? "Unliked" : "Liked" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}
