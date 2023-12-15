import {motion} from "framer-motion";
import {Stack} from "@mui/material";
import React from "react";


const Header = () => {
    return(
        <Stack
            className={"header"}
            direction="column"
            spacing={2}
        >
            <motion.h1
                initial={{opacity: 0}}
                animate={{opacity: 0.75}}
                transition={{
                    duration: 1.5
                }}
            >Сидоров Иван Олегович
            </motion.h1>
            <motion.h2
                initial={{opacity: 0}}
                animate={{opacity: 0.75}}
                transition={{
                    duration: 2.5
                }}
            >Вариант 861462
            </motion.h2>
            <motion.h3
                initial={{opacity: 0}}
                animate={{opacity: 0.75}}
                transition={{
                    duration: 3.5
                }}
            >Группа P3225
            </motion.h3>
        </Stack>
    )
}

export default Header;