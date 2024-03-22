import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/components/Login.jsx';
import Register from '../src/components/Register.jsx';
import LevelSelect from '../src/components/LevelSelect.jsx';
import LevelStart from '../src/components/LevelStart.jsx';
import Game from '../src/components/Game.jsx';
import Leaderboards from '../src/components/Leaderboards.jsx';
import History from '../src/components/History.jsx';
import Profile from '../src/components/Profile.jsx';
import Menu from '../src/components/extras/Menu.jsx';
import Pokemon1 from './images/pokemon1.jpg';
import Pokemon2 from './images/pokemon2.jpg';
import Pokemon3 from './images/pokemon3.jpg';
import Pokemon4 from './images/pokemon4.jpg';
import Pokemon5 from './images/pokemon5.png';
import Simpsons1 from "./images/simpsons1.jpg";
import Simpsons2 from "./images/simpsons2.png";
import Simpsons3 from "./images/simpsons3.jpg";
import Simpsons4 from "./images/simpsons4.png";
import Simpsons5 from "./images/simpsons5.png";
import Family1 from "./images/family1.jpg";
import Family2 from "./images/family2.jpg";
import Family3 from "./images/family3.jpg";
import Family4 from "./images/family4.png";
import Family5 from "./images/family5.jpg";

import Fortnite1 from "./images/fortnite1.jpg";
import Fortnite2 from "./images/fortnite2.jpg";
import Fortnite3 from "./images/fortnite3.jpg";
import Fortnite4 from "./images/fortnite4.jpg";
import Fortnite5 from "./images/fortnite5.jpg";

import Roblox1 from "./images/roblox1.jpg";
import Roblox2 from "./images/roblox2.jpg";
import Roblox3 from "./images/roblox3.jpg";
import Roblox4 from "./images/roblox4.jpg";
import Roblox5 from "./images/roblox5.jpg";

import Cs1 from "./images/cs1.jpg";
import Cs2 from "./images/cs2.jpg";
import Cs3 from "./images/cs3.jpg";
import Cs4 from "./images/cs4.jpg";
import Cs5 from "./images/cs5.jpg";

import Apex1 from "./images/apex1.jpg";
import Apex2 from "./images/apex2.jpg";
import Apex3 from "./images/apex3.jpg";
import Apex4 from "./images/apex4.jpg";
import Apex5 from "./images/apex5.jpg";

import Pubg1 from "./images/pubg1.jpg";
import Pubg2 from "./images/pubg2.jpg";
import Pubg3 from "./images/pubg3.jpg";
import Pubg4 from "./images/pubg4.jpg";
import Pubg5 from "./images/pubg5.jpg";
import Pubg6 from "./images/pubg6.jpg";
import Pubg7 from "./images/pubg7.jpg";

import Sub1 from "./images/sub1.jpg";
import Sub2 from "./images/sub2.jpg";
import Sub3 from "./images/sub3.jpg";
import Sub4 from "./images/sub4.jpg";
import Sub5 from "./images/sub5.jpg";
import Sub6 from "./images/sub6.jpg";
import Sub7 from "./images/sub7.jpg";

import Rl1 from "./images/rl1.jpg";
import Rl2 from "./images/rl2.jpg";
import Rl3 from "./images/rl3.jpg";
import Rl4 from "./images/rl4.jpg";
import Rl5 from "./images/rl5.jpg";
import Rl6 from "./images/rl6.jpg";
import Rl7 from "./images/rl7.jpg";

import Cr1 from "./images/cr1.jpg";
import Cr2 from "./images/cr2.jpg";
import Cr3 from "./images/cr3.jpg";
import Cr4 from "./images/cr4.jpg";
import Cr5 from "./images/cr5.jpg";
import Cr6 from "./images/cr6.jpg";
import Cr7 from "./images/cr7.jpg";


import Halo1 from "./images/halo1.jpg";
import Halo2 from "./images/halo2.jpg";
import Halo3 from "./images/halo3.jpg";
import Halo4 from "./images/halo4.jpg";
import Halo5 from "./images/halo5.jpg";
import Halo6 from "./images/halo6.jpg";
import Halo7 from "./images/halo7.jpg";

import Battle1 from "./images/battle1.jpg";
import Battle2 from "./images/battle2.jpg";
import Battle3 from "./images/battle3.jpg";
import Battle4 from "./images/battle4.jpg";
import Battle5 from "./images/battle5.jpg";
import Battle6 from "./images/battle6.jpg";
import Battle7 from "./images/battle7.jpg";

import Gta1 from "./images/gta1.jpg";
import Gta2 from "./images/gta2.jpg";
import Gta3 from "./images/gta3.jpg";
import Gta4 from "./images/gta4.jpg";
import Gta5 from "./images/gta5.jpg";
import Gta6 from "./images/gta6.jpg";
import Gta7 from "./images/gta7.jpg";

import Grand1 from "./images/grand1.jpg";
import Grand2 from "./images/grand2.jpg";
import Grand3 from "./images/grand3.jpg";
import Grand4 from "./images/grand4.jpg";
import Grand5 from "./images/grand5.jpg";
import Grand6 from "./images/grand6.jpg";
import Grand7 from "./images/grand7.jpg";

import Mario1 from "./images/mario1.jpg";
import Mario2 from "./images/mario2.jpg";
import Mario3 from "./images/mario3.jpg";
import Mario4 from "./images/mario4.jpg";
import Mario5 from "./images/mario5.jpg";
import Mario6 from "./images/mario6.jpg";
import Mario7 from "./images/mario7.jpg";

import Critical1 from "./images/critical1.jpg";
import Critical2 from "./images/critical2.jpg";
import Critical3 from "./images/critical3.jpg";
import Critical4 from "./images/critical4.jpg";
import Critical5 from "./images/critical5.jpg";
import Critical6 from "./images/critical6.jpg";
import Critical7 from "./images/critical7.jpg";

import Mine1 from "./images/mine1.jpg";
import Mine2 from "./images/mine2.jpg";
import Mine3 from "./images/mine3.jpg";
import Mine4 from "./images/mine4.jpg";
import Mine5 from "./images/mine5.jpg";
import Mine6 from "./images/mine6.jpg";
import Mine7 from "./images/mine7.jpg";

import League1 from "./images/league1.jpg";
import League2 from "./images/league2.jpg";
import League3 from "./images/league3.jpg";
import League4 from "./images/league4.jpg";
import League5 from "./images/league5.jpg";
import League6 from "./images/league6.jpg";
import League7 from "./images/league7.jpg";

import Red1 from "./images/red1.jpg";
import Red2 from "./images/red2.jpg";
import Red3 from "./images/red3.jpg";
import Red4 from "./images/red4.jpg";
import Red5 from "./images/red5.jpg";
import Red6 from "./images/red6.jpg";
import Red7 from "./images/red7.jpg";

import Rust1 from "./images/rust1.jpg";
import Rust2 from "./images/rust2.jpg";
import Rust3 from "./images/rust3.jpg";
import Rust4 from "./images/rust4.jpg";
import Rust5 from "./images/rust5.jpg";
import Rust6 from "./images/rust6.jpg";
import Rust7 from "./images/rust7.jpg";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Leaderboards" element={<Leaderboards />} />
          <Route path="/History" element={<History />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/LevelSelect" element={<LevelSelect />} />
          <Route path="/LevelStart/:levelNumber" element={<LevelStart />} />
          <Route
  path="/Game/1"
  element={<Game level={{ cardAmount: 15, time: 120, images: [Pokemon1, Pokemon2, Pokemon3, Pokemon4, Pokemon5] }} level_id={1} />} 
/>

<Route
  path="/Game/2"
  element={<Game level={{ cardAmount: 15, time: 120, images: [Simpsons1, Simpsons2, Simpsons3, Simpsons4, Simpsons5] }} level_id={2} />} 
/>

<Route
  path="/Game/3"
  element={<Game level={{ cardAmount: 15, time: 120, images: [Family1, Family2, Family3, Family4, Family5] }} level_id={3} />} 
/>
<Route
  path="/Game/4"
  element={<Game level={{ cardAmount: 15, time: 120, images: [Fortnite1, Fortnite2, Fortnite3, Fortnite4, Fortnite5] }} level_id={4} />} 
/>
<Route
  path="/Game/5"
  element={<Game level={{ cardAmount: 15, time: 120, images: [Roblox1, Roblox2, Roblox3, Roblox4, Roblox5] }} level_id={5} />}
/>
<Route
  path="/Game/6"
  element={<Game level={{ cardAmount: 15, time: 120, images: [Cs1, Cs2, Cs3, Cs4, Cs5] }} level_id={6} />}
/>
<Route
  path="/Game/7"
  element={<Game level={{ cardAmount: 15, time: 120, images: [Apex1, Apex2, Apex3, Apex4, Apex5] }} level_id={7} />} 
/>

<Route
  path="/Game/8"
  element={<Game level={{ cardAmount: 21, time: 120, images: [Pubg1, Pubg2, Pubg3, Pubg4, Pubg5, Pubg6, Pubg7] }} level_id={8} />} 
/>
<Route
  path="/Game/9"
  element={<Game level={{ cardAmount: 21, time: 120, images: [Sub1, Sub2, Sub3, Sub4, Sub5, Sub6, Sub7] }} level_id={9} />} 
/>
<Route
  path="/Game/10"
  element={<Game level={{ cardAmount: 21, time: 60, images: [Rl1, Rl2, Rl3, Rl4, Rl5, Rl6, Rl7] }} level_id={10} />} 
/>
<Route
  path="/Game/11"
  element={<Game level={{ cardAmount: 21, time: 60, images: [Cr1, Cr2, Cr3, Cr4, Cr5, Cr6, Cr7] }} level_id={11} />}
/>
<Route
  path="/Game/12"
  element={<Game level={{ cardAmount: 21, time: 60, images: [Halo1, Halo2, Halo3, Halo4, Halo5, Halo6, Halo7] }} level_id={12} />} 
/>
<Route
  path="/Game/13"
  element={<Game level={{ cardAmount: 21, time: 60, images: [Battle1, Battle2, Battle3, Battle4, Battle5, Battle6, Battle7] }} level_id={13} />} 
/>
<Route
  path="/Game/14"
  element={<Game level={{ cardAmount: 21, time: 60, images: [Gta1, Gta2, Gta3, Gta4, Gta5, Gta6, Gta7] }} level_id={14} />} 
/>
<Route
  path="/Game/15"
  element={<Game level={{ cardAmount: 21, time: 60, images: [Grand1, Grand2, Grand3, Grand4, Grand5, Grand6, Grand7] }} level_id={15} />} 
/>
<Route
  path="/Game/16"
  element={<Game level={{ cardAmount: 21, time: 60, images: [Mario1, Mario2, Mario3, Mario4, Mario5, Mario6, Mario7] }} level_id={16} />} 
/>
<Route
  path="/Game/17"
  element={<Game level={{ cardAmount: 21, time: 60, images: [Critical1, Critical2, Critical3, Critical4, Critical5, Critical6, Critical7] }} level_id={17} />} 
/>
<Route
  path="/Game/18"
  element={<Game level={{ cardAmount: 21, time: 60, images: [Mine1, Mine2, Mine3, Mine4, Mine5, Mine6, Mine7] }} level_id={18} />} 
/>
<Route
  path="/Game/19"
  element={<Game level={{ cardAmount: 21, time: 60, images: [League1, League2, League3, League4, League5, League6, League7] }} level_id={19} />} 
/>
<Route
  path="/Game/20"
  element={<Game level={{ cardAmount: 21, time: 60, images: [Red1, Red2, Red3, Red4, Red5, Red6, Red7] }} level_id={20} />} 
/>
<Route
  path="/Game/21"
  element={<Game level={{ cardAmount: 21, time: 60, images: [Rust1, Rust2, Rust3, Rust4, Rust5, Rust6, Rust7] }} level_id={21} />} 
/>

          <Route path="/Profile" element={<Profile />} />
          <Route path="/Menu" element={<Menu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
