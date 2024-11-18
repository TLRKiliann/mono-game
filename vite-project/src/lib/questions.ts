import { QuizProps, OrderProps } from "./types";

export const quizQuestions: QuizProps[] = [
    {
        id: 1,
        ask: "Quel mode de transport respectueux de l'environnement ne nécessite pas de carburant et contribue à réduire la pollution de l'air ?",
        answer: "Vélo"
    },
    {
        id: 2,
        ask: "Quel aliment est une excellente source de protéines, pousse sous terre et est souvent associé aux frites ?",
        answer: "Pomme de terre"
    },
    {
        id: 3,
        ask: "Comment peut on de maniere eco-responsable arroser des plantes et réduire sa consommation d'eau courante à la maison?",
        answer: "La récupération des eaux de pluie ! "
    }
];
					
export const defiQuestions: QuizProps[] = [
    {
        id: 1,
        ask: "Comment s'appelle le champion du monde de boxe ?",
        answer: "Mike Tyson"
    },
    {
        id: 2,
        ask: "Quelle est la plage la plus grande du monde ?",
        answer: "Les Sables d'Olonne"
    },
    {
        id: 3,
        ask: "Quelle la femme la plus belle du monde ?",
        answer: "Nora"
    },
];

export const sanctionOrder: OrderProps[] = [
    {
        id: 1,
        order: "Reculer de 2 cases !"
    },
    {
        id: 2,
        order: "Reculer de 4 cases !"
    },
    {
        id: 3,
        order: "Reculer de 5 cases !"
    }
];

export const bonneActionOrder: OrderProps[] = [
    {
        id: 1,
        order: "Donner + 2 cases au joueur de votre choix."
    },
    {
        id: 2,
        order: "Donner + 4 cases au joueur de votre choix."
    },
    {
        id: 3,
        order: "Donner + 5 cases au joueur de votre choix."
    }
];


															