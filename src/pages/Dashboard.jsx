import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { auth } from "../firebase/firebase";

const Dashboard = () => {
  const authstate = useAuthState(auth);
  const navigate = useNavigate();
  if (!authstate) navigate("/register");
  React.useEffect(() => {
    console.log(authstate);
  }, [authstate]);

  const sampleData = [
    {
      title: "ideas",
      cards: [
        {
          cardName: "create new components",
          tags: [
            {
              color: "babyblue",
              name: "figma",
              color: "yellow",
              name: "create react app",
            },
          ],
          users: ["allowed users imgs"],
          notes: [
            {
              username: "bro123",
              note: "guys remember to create react app not vite",
            },
          ],
        },
        
      ],
    },
  ];

  return (
    <Layout>
      <div className=" bg-orange-500 w-full h-[85vh] z-50 flex-wrap">
        {sampleData.map((data) => (
          <div className=" bg-[#f2f2f2]  w-80 h-fit">
            {data?.title}
            {data?.cards.map((card) => (
              <>
                <div className=" bg-lime-400">{card.cardName}</div>
                {card?.tags.map((tags)=><div>{tags.name}</div>)}
              </>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
