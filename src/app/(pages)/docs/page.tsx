import BotDocs from "@/components/bot-docs";
import { Link2 } from "lucide-react";
import Link from "next/link";

const DocsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <BotDocs />
      <h2 className="text-xl font-semibold mb-2">Badges</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Premium House:</strong> That house supports the project and
          gets premium features with over 25 euro donation per month
        </li>
        <li>
          <strong>Dilled surveys:</strong> That house has over 90% of filled
          surveys
        </li>
        <li>
          <strong>ConqBot:</strong> That house uses the ConqBot events over 50
        </li>
        <li>
          <strong>Lineups:</strong> That house has over public 100 lineups
        </li>
        <li>
          <strong>Archive:</strong> That house has over 50 archived Povs
        </li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">Bot Config:</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Member - Choose your house member role. Based on this role, Konquerus
          will upload all your players to the house on Conqsite
        </li>
        <li>
          Logs - Choose logs channel to display information for you, who joins
          or leaves your house
        </li>
        <li>
          TW Member Role - Choose member role on your TW discord for Konquerus.
          The bot needs to know whose attendance should be tracked on TW
        </li>
        <li>
          Lineup 1 - Choose your lineup role and signup channel for each lineup.
          The bot needs to know which channel should be checked to upload signup
          data on Conqsite and how to sort players to lineup
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">House Card Details:</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>House Name - should be unique and not longer than 20 characters</li>
        <li>
          House Description - is required, not offensive to others, and not
          longer than 45 characters
        </li>
        <li>
          Country - e.g. &rdquo;Poland&rdquo;, &rdquo;UK&rdquo; or maybe
          &rdquo;International&rdquo;
        </li>
        <li>Discord Link - for your house discord server</li>
        <li>
          Avatar - Image URL address. I recommend using a free image hoster like
          https://imgur.com to upload your house image. DON&rsquo;T use URLs
          from discord images, as they will disappear after a few days
        </li>
        <li>Server - On which CB server can we find your home</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">General Informations:</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          Add/Remove Member - To add user to your house, give him Member role on
          your Discord and Konquerus gonna add him to website database. To
          remove someone from house, take off his Member role or he will get
          remove automaticly when he leave your server or someone kick him
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Funders Houses Options:</h2>
      <h3 className="text-lg font-semibold mb-1">House:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Change house name - Not available yet</li>
        <li>More than 3(6) commanders and more than 1(2) right hand</li>
        <li>More than 5(10) templates</li>
        <li>More than 3(6) events</li>
        <li>more them 1(3) houses per player</li>
      </ul>
      <h3 className="text-lg font-semibold mb-1">User:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Post builds only to house - Not available yet</li>
        <li>Custom themes - Not available yet</li>
      </ul>
      <h2 className="text-xl font-semibold mb-2">
        Participated in creating the project
      </h2>
      <ul className="list-disc pl-6">
        <li>
          <strong>Website Developer:</strong>
          <ul className="list-disc pl-6">
            <li>BardDev</li>
          </ul>
        </li>
        <li>
          <strong>Bot Developer:</strong>
          <ul className="list-disc pl-6">
            <li>Czarny</li>
          </ul>
        </li>
        <li>
          <strong>Graphic:</strong>
          <ul className="list-disc pl-6">
            <li>Elemele</li>
            <li>Hexer</li>
          </ul>
        </li>
        <li>
          <strong>Data Miner:</strong>
          <ul className="list-disc pl-6">
            <li>Lx_</li>
            <li>Villek</li>
          </ul>
        </li>
        <li>
          <strong>Cyclical Founders:</strong>
          <ul className="list-disc pl-6">
            <li>Zimek</li>
          </ul>
        </li>
        <li>
          <strong>Others:</strong>
          <ul className="list-disc pl-6">
            <li>Nero - Coding Mentor</li>
            {/* <li>SuperKitowiec - Promotion Support</li> */}
          </ul>
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">Sources:</h2>
      <ul className="pl-6 mb-4 text-red-600">
        <li>
          <Link
            className="flex items-center gap-2"
            href="https://www.conquerorsblade.com/en/"
            target="_blank"
          >
            <Link2 /> Game Conquerors Blade
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center gap-2"
            href="https://conqhub.com"
            target="_blank"
          >
            <Link2 /> Conqhub
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center gap-2"
            href="https://conquerors-blade.fandom.com/wiki/Conquerors_Blade_Wiki"
            target="_blank"
          >
            <Link2 /> Conquerors Blade Wiki
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DocsPage;
