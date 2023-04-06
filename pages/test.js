import axios from 'axios';
import { useState, useEffect } from 'react';

const AudioList = () => {
  const [pistes, setPistes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1337/api/pistes")
      .then((response) => {
        setAudios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des audios</h1>
      {pistes.map((audio) => (
        <div key={audio.id}>
          <h2>{audio.title}</h2>
          <p>{audio.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AudioList;

// import axios from "axios";
// import { useState, useEffect } from "react";

// const AudioList = () => {
//   const [audios, setAudios] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:1337/api/pistes")
//       .then((response) => {
//         setAudios(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Liste des audios</h1>
//       {audios.map((audio) => (
//         <div key={audio.id}>
//           <h2>{audio.title}</h2>
//           <p>{audio.description}</p>
//           {/* Ajoutez le lecteur audio ici */}
//           <audio controls>
//             <source src={audio.audioFile.url} type={audio.audioFile.mime} />
//             Your browser does not support the audio element.
//           </audio>
          
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AudioList;