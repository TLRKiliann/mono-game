import { SanctionsProps } from "./types";

export const sanctionQuestions: SanctionsProps[] = [
    {
        id: 1,	
        title: "Zone d'Incendie de Forêt",
        info: "Votre campement a pris feu ! Reculez de trois cases.",
        //consequence: "Reculez de trois cases."
        consequence: 3
    },
    {
        id: 2,
        title: "Océan de Plastique",
        info: "Vous avez rencontré une mer de déchets plastiques.",
        //consequence: "Passez votre tour pendant que vous nettoyez"
        consequence: 4
    },
    {
        id: 3,
        title: "Désert de Sécheresse",
        info: "Pénurie d'eau !",
        //consequence: "Reculez de deux cases"
        consequence: 2
    },
    {
        id: 4,
        title: "Désastre de Déforestation",
        info: "La forêt dans laquelle vous étiez est maintenant un site de déboisement.",
        //consequence: "Reculez de quatre cases"
        consequence: 4
    },
    {
        id: 5,	
        title: "Déversement de Pétrole",
        info: "Votre bateau a heurté une marée noire.",
        //consequence: "Passez votre tour pendant que vous nettoyez le désordre"
        consequence: 2
    },
    {
        id: 6,	
        title: "Glacier en Fusion",
        info: "La glace sous vos pieds fond !",
        //consequence: "Reculez d'une case"
        consequence: 1
    },
    {
        id: 7,	
        title: "Habitat d'Espèces en Danger",
        info: "Vous avez perturbé une zone de nidification.",
        //consequence: "Reculez de deux cases"
        consequence: 2
    },
    {
        id: 8,	
        title: "Rivière Polluée",
        info: "Votre bateau s'est coincé dans une rivière polluée.",												
        //consequence: "Passez votre tour"
        consequence: 2
    },
    {
        id: 9,	
        title: "Alerte à la Pollution Atmosphérique",	
        info: "Alerte au smog !",								
        //consequence: "Reculez d'une case"
        consequence: 1
    },
    {
        id: 10,
        title: "Fuite Nucléaire",
        info: "Zone radioactive !",
        //consequence: "Passez votre tour pendant que vous trouvez un chemin sûr"
        consequence: 4
    },
	{
        id: 11,	
        title: "Blanchissement des Coraux",
        info: "Le récif corallien est en train de mourir.",
        //consequence: "Reculez de trois cases."
        consequence: 3
    },
    {
        id: 12,
        title: "Avalanche de Déchets",
        info: "Une montagne de déchets bloque votre chemin.",
        //consequence: "Reculez de deux cases"
        consequence: 2
    },
    {
        id: 13,
        title: "Falaise d'Érosion",
        info: "Le bord de la falaise s'est effondré.",
        //consequence: "Reculez d'une case"
        consequence: 1
    },								
	{
        id: 14,	
        title: "Invasion d'Espèces Envahissantes",
        info: "Des espèces étrangères ont envahi votre jardin.",
        //consequence: "Retournez à la case départ"
        consequence: "reset"
    },
    {
        id: 15,
        title: "Tempête de Changement Climatique",
        info: "Conditions météorologiques extrêmes !",
        //consequence: "Retournez à la case départ"
        consequence: "reset"
    },
    {
        id: 16,	
        title: "Décharge de Déchets Électroniques",
        info: "Vous êtes tombé sur une décharge de déchets électroniques.",
        //consequence: "Passez votre tour pendant que vous vous débarrassez en toute sécurité de vieux gadgets"
        consequence: 1
    },	
	{
        id: 17,	
        title: "Alerte Qualité de l'Air",
        info: "Mauvaise qualité de l'air !",
        //consequence: "Reculez de deux cases"
        consequence: 2
    },
    {
        id: 18,	
        title: "Perte de Biodiversité",
        info: "Destruction de l'habitat !",
        //consequence: "Reculez de quatre cases"
        consequence: 4
    },
    {
        id: 19,	
        title: "Interdiction des Sacs en Plastique",
        info: "Vous avez oublié votre sac réutilisable !",
        //consequence: "Reculez d'une case"
        consequence: 1
    },
	{
        id: 20,	
        title: "Fuite de Pétrolier",
        info: "Une fuite de pétrole a bloqué votre chemin.",
        //consequence: "Reculez de quatre cases"
        consequence: 4
    },
    {
        id: 21,	
        title: "Habitat des Espèces Menacées",
        info: "Vous avez perturbé un ours en hibernation.",
        //consequence: "Reculez de deux cases"
        consequence: 2
    },
    {
        id: 22,	
        title: "Négation du Changement Climatique",
        info: "Vous êtes tombé sur un climatosceptique.",
        //consequence: "Passez votre tour pendant que vous les éduquez"
        consequence: 1
    },	
	{
        id: 23,	
        title: "Désert Alimentaire",
        info: "Pas de produits frais à proximité !",
        //consequence: "Reculez d'une case"
        consequence: 1
    },
    {
        id: 24,	
        title: "Zone de Pénurie d'Eau",
        info: "Pénurie d'eau !", 													
        //consequence: "Reculez de deux cases"
        consequence: 2												
    },
    {
        id: 25,	
        title: "Mauvaise Manipulation du Recyclage",
        info: "Vous avez contaminé la poubelle de recyclage.", 													
        //consequence: "Reculez d'une case."
        consequence: 1
    },
	{
        id: 26,	
        title: "Site de Déchets Nucléaires",
        info: "Zone radioactive !",										
        //consequence: "Passez votre tour pendant que vous trouvez un chemin sûr"
        consequence: 2
    },
    {
        id: 27,	
        title: "Îlot de Chaleur Urbain",
        info: "Alerte à la vague de chaleur !",												
        //consequence: "Reculez de quatre cases"
        consequence: 4
    },
    {
        id: 28,	
        title: "Zone de Surpêche",
        info: "Épuisement des stocks de poissons !",
        //consequence: "Reculez de deux cases"
        consequence: 2
    },
    {
        id: 29,	
        title: "Piège de Greenwashing",
        info: "Vous êtes tombé dans le piège du faux étiquetage écologique.",
        //consequence: "Retournez à la case départ"
        consequence: "reset"
    }											
];