import { lazy } from "react"

const Consigne = lazy(() => import("./Consigne/"));
const PsychoTest = lazy(() => import("./PsychoTest/"))
const Regle = lazy(() => import("./Regle/"))
const Role = lazy(() => import("./Role/"))
const Training = lazy(() => import("./Training/"))
// const Calibration = lazy(() => import("./Calibration/"))
const Receveur = lazy(() => import("./Receveur/"))
const HandGrip = lazy(() => import("./HandGrip/"))
const MaxForce = lazy(() => import("./MaxForce/"))
const Commandeur = lazy(() => import("./Commandeur/"))
const Proposeur = lazy(() => import("./Proposeur/"))
const End = lazy(() => import("./End/"))
const Continuer = lazy(() => import("./Continuer/"))
const Assumption = lazy(() => import("./Assumption/"))

export const titles = {
    consigne: 'Formulaire',
    psychotest: 'Maia',
    regle: "Règle de l'expérimentation",
    training: "Entraînement",
    role: "Changement de rôle",
    // calibration: "Calibration",
    receveur: "Receveur",
    handgrip: "Changement de rôle ",
    max: "Capacité maximale",
    commandeur: "Commandeur",
    proposeur: "Proposeur",
    end: "Terminer l'experimentation",
    continuer: "Experimentation",
    assumption: "Assumptions Checks",
}

export const routes = [
    {path: '/Consigne', component: Consigne, title: titles.consigne},
    {path: '/Maia', component: PsychoTest, title: titles.psychotest},
    {path: '/Regle', component: Regle, title: titles.regle},
    {path: '/Training', component: Training, title: titles.training},
    // {path: '/Calibration', component: Calibration, title: titles.calibration},
    {path: '/Role', component: Role, title: titles.role},
    {path: '/Receveur', component: Receveur, title: titles.receveur},
    {path: '/Handgrip', component: HandGrip, title: titles.handgrip},
    {path: '/Max', component: MaxForce, title: titles.max},
    {path: '/Commandeur', component: Commandeur, title: titles.commandeur},
    {path: '/Proposeur', component: Proposeur, title: titles.proposeur},
    {path: '/End', component: End, title: titles.end},
    {path: '/Continuer', component: Continuer, title: titles.continuer},
    {path: '/Assumption', component: Assumption, title: titles.assumption},
]