import ChildElement from "../components/childElement/ChildElement";
import MyImage from "../components/myImage/MyImage";
import { logToConsole } from "../functions/examples";

export const wrapperElements = [
    {
        name: "Nino 1",
        surname: "Ninic 1",
        city: "PG",
        image: <MyImage src="logo192.png"/>,
        childElement: ChildElement,
        onClick: () => logToConsole()
    },
    {
        name: "Nino 2",
        surname: "Ninic 1",
        city: "PG",
        image: <MyImage src="logo192.png"/>,
        childElement: ChildElement,
        onClick: () => logToConsole()
    },
    {
        name: "Nino 3",
        surname: "Ninic 2",
        city: "PG",
        image: <MyImage src="logo192.png"/>,
        childElement: ChildElement,
        onClick: () => logToConsole()
    },
    {
        name: "Nino 4",
        surname: "Ninic 2",
        city: "PG",
        image: <MyImage src="logo192.png"/>,
        childElement: ChildElement,
        onClick: () => logToConsole()
    }
]