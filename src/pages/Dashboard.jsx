import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TrelloCard from "../components/TrelloCard";
import { auth } from "../firebase/firebase";

const Dashboard = () => {
  const authstate = useAuthState(auth);
  const navigate = useNavigate();

  // if (!authstate) navigate("/register");
  // React.useEffect(() => {
  //   console.log(authstate);
  // }, [authstate]);

  const sampleData = [
    {
      title: "💡 Ideas",
      cards: [
        {
          name: "create new react components",
          completed: false,
          tags: [{ name: "figma", color: "red" }],
          notes:[{username:'usernames',note:'finish this project pls'}]
        },
      ],
    },
  ];

  return (
    <Layout>
      <TrelloCard />
    </Layout>
  );
};

export default Dashboard;
