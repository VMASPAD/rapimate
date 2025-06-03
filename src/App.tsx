import "./App.css";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router";
import Account from "./pages/Account";
import BuySub from "./pages/BuySub";
import Chat from "./pages/Chat";
import Menu from "./pages/Menu";
import { motion } from "framer-motion"
import { ShineBorder } from "./components/magicui/shine-border";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Account />,
    },
    {
      path: "/buy-sub",
      element: <BuySub />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
    {
      path: "/menu",
      element: <Menu />,
    }
  ]);

  return (
    <>
      <div className="w-screen flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 15 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            type: "spring",
            stiffness: 120,
          }}
          className="flex items-center p-3 text-black gap-5 bg-accent rounded-lg shadow-xl shadow-primary"
        >
          <ShineBorder shineColor={["#a37764", "#ebd6cb", "#c39e88"]} />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
          <motion.a
            className=""
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
          >
            Account
          </motion.a>
          <motion.a
            className=""
            href="/buy-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeIn", delay: 0.2 }}
          >
            Subscription
          </motion.a>
          <motion.a
            className=""
            href="/chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeIn", delay: 0.3 }}
          >
            Chat
          </motion.a>
          <motion.a
            className=""
            href="/menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeIn", delay: 0.4 }}
          >
            Menu
          </motion.a>
        </motion.div>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
