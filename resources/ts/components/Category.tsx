import React from "react";
import Unselected from "../../../public/assets/unselected.svg";
import Food from "../../../public/assets/food.svg";
import EatingOut from "../../../public/assets/eating_out.svg";
import Lifework from "../../../public/assets/lifework.svg";
import Traffic from "../../../public/assets/traffic.svg";
import Medical from "../../../public/assets/medical.svg";
import Clothing from "../../../public/assets/clothing.svg";
import Hobby from "../../../public/assets/hobby.svg";
import Utility from "../../../public/assets/utility.svg";
import Connection from "../../../public/assets/connection.svg";
import { useRecoilValue } from "recoil";
import { categoryAtom } from "@/recoil/CategoryAtom";
import styles from "./Category.module.css";

type CategoryProps = {
    catNum: number;
};

// カテゴリー番号を取得
export const Category = ({ catNum }: CategoryProps): JSX.Element => {
    const category = useRecoilValue(categoryAtom);
    const color = category[catNum].color;
    const style = { fill: color };
    switch (catNum) {
        case 0:
            return (
                <>
                    <Food style={style} className={styles.icon} />
                    <span className={styles.name}>{category[catNum].name}</span>
                </>
            );
        case 1:
            return (
                <>
                    <EatingOut style={style} className={styles.icon} />
                    <span className={styles.name}>{category[catNum].name}</span>
                </>
            );
        case 2:
            return (
                <>
                    <Lifework style={style} className={styles.icon} />
                    <span className={styles.name}>{category[catNum].name}</span>
                </>
            );
        case 3:
            return (
                <>
                    <Traffic style={style} className={styles.icon} />
                    <span className={styles.name}>{category[catNum].name}</span>
                </>
            );
        case 4:
            return (
                <>
                    <Medical style={style} className={styles.icon} />
                    <span className={styles.name}>{category[catNum].name}</span>
                </>
            );
        case 5:
            return (
                <>
                    <Clothing style={style} className={styles.icon} />
                    <span className={styles.name}>{category[catNum].name}</span>
                </>
            );
        case 6:
            return (
                <>
                    <Hobby style={style} className={styles.icon} />
                    <span className={styles.name}>{category[catNum].name}</span>
                </>
            );
        case 7:
            return (
                <>
                    <Utility style={style} className={styles.icon} />
                    <span className={styles.name}>{category[catNum].name}</span>
                </>
            );
        case 8:
            return (
                <>
                    <Connection style={style} className={styles.icon} />
                    <span className={styles.name}>{category[catNum].name}</span>
                </>
            );
        default:
            return (
                <>
                    <Unselected style={style} className={styles.icon} />
                    <span className={styles.name}>{category[catNum].name}</span>
                </>
            );
    }
};
