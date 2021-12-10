// import React from "react";
// import { View, TouchableOpacity, Text } from "react-native";
// import Icon from "react-native-vector-icons/AntDesign";

// export default function HandleNext({ show, handlingNext, speakQuestion }) {
//   return (
//     <>
//       {show ? (
//         <>
//           <TouchableOpacity
//             onPress={handlingNext}
//             style={{
//               marginTop: 20,
//               width: "100%",
//               backgroundColor: COLORS.accent,
//               padding: 20,
//               borderRadius: 5
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 20,
//                 color: COLORS.white,
//                 textAlign: "center"
//               }}
//             >
//               Next
//             </Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <>
//           <TouchableOpacity onPress={speakQuestion}>
//             <Icon
//               name="sound"
//               style={{
//                 color: "black",
//                 fontSize: 30
//               }}
//             />
//           </TouchableOpacity>
//         </>
//       )}
//     </>
//   );
// }
