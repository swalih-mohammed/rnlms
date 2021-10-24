import React, { useState, useEffect, useRef } from "react";
import { Modal, View, TouchableOpacity, Text, Dimensions } from "react-native";
import { COLORS, SIZES } from "../../Helpers/constants";
const { width, height } = Dimensions.get("window");
import LottieView from "lottie-react-native";
import AudioPlayerWithoutControl from "../../Helpers/PlayerWithoutControl";

const CourseDetail = ({
  showScoreModal,
  qlength,
  score,
  handleSubmitTest,
  restartQuiz
}) => {
  const animation = useRef(null);
  useEffect(() => {
    // animation.current.play();
    if (animation.current) {
      animation.current.play(0, 100);
    }
  }, []);

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={showScoreModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              width: width * 0.95,
              hight: height * 0.6,
              borderRadius: 20,
              padding: 20,
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {(score / qlength) * 100 > 79 ? "Congratulations!" : "Oops!"}
            </Text>
            <View
              style={{
                width: width * 0.6,
                hight: 300,
                // borderRadius: 20,
                padding: 100,
                alignItems: "center"
              }}
            >
              {(score / qlength) * 100 > 79 ? (
                <LottieView
                  ref={animation}
                  source={require("../../../assets/lotties/success.json")}
                  autoPlay={false}
                  loop={false}
                />
              ) : (
                <LottieView
                  ref={animation}
                  source={require("../../../assets/lotties/failure.json")}
                  autoPlay={false}
                  loop={false}
                  // autoPlay

                  // loop
                />
              )}
            </View>
            <AudioPlayerWithoutControl
              is_system={true}
              success={(score / qlength) * 100 > 79 ? true : false}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginVertical: 20
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color:
                    (score / qlength) * 100 > 79 ? COLORS.success : COLORS.error
                }}
              >
                {(score / qlength) * 100}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color:
                    (score / qlength) * 100 > 79 ? COLORS.success : COLORS.error
                }}
              >
                %
              </Text>
            </View>
            {/* Retry Quiz button */}

            <TouchableOpacity
              onPress={
                (score / qlength) * 100 > 79
                  ? () => handleSubmitTest()
                  : () => restartQuiz()
              }
              style={{
                backgroundColor: COLORS.accent,
                padding: 10,
                width: "95%",
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: COLORS.white,
                  fontSize: 20
                }}
              >
                {/* Next Unit */}
                {(score / qlength) * 100 > 79 ? "Next Lesson" : "Try Again"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
export default CourseDetail;

// import React, { useState, useEffect } from "react";
// import { Modal, View, TouchableOpacity, Text } from "react-native";

// const CourseDetail = ({ showScoreModal }) => {
//   return (
//     <>
//       <Modal animationType="slide" transparent={true} visible={showScoreModal}>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: COLORS.primary,
//             alignItems: "center",
//             justifyContent: "center"
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: COLORS.white,
//               width: "90%",
//               borderRadius: 20,
//               padding: 20,
//               alignItems: "center"
//             }}
//           >
//             <Text style={{ fontSize: 20, fontWeight: "bold" }}>
//               {(score / allQuestions.length) * 100 > 79
//                 ? "Congratulations!"
//                 : "Oops!"}
//             </Text>

//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 marginVertical: 20
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 30,
//                   color:
//                     (score / allQuestions.length) * 100 > 79
//                       ? COLORS.success
//                       : COLORS.error
//                 }}
//               >
//                 {(score / allQuestions.length) * 100}
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   color: COLORS.black
//                 }}
//               >
//                 %
//               </Text>
//             </View>
//             {/* Retry Quiz button */}
//             <TouchableOpacity
//               onPress={
//                 (score / allQuestions.length) * 100 > 79
//                   ? () => handleSubmitTest()
//                   : () => restartQuiz()
//               }
//               style={{
//                 backgroundColor: COLORS.accent,
//                 padding: 10,
//                 width: "95%",
//                 borderRadius: 10
//               }}
//             >
//               <Text
//                 style={{
//                   textAlign: "center",
//                   color: COLORS.white,
//                   fontSize: 20
//                 }}
//               >
//                 {(score / allQuestions.length) * 100 > 79
//                   ? "Go to Next Item"
//                   : "Try Again"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };
// export default CourseDetail;
