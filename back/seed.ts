import {prisma} from "./lib/prisma";

(async () => {

    const users = [
        { name: "Arthur", email: "arthur@gmail.com", avatar: "3654986784" },
        { name: "Sophie", email: "sophie.martin@hotmail.fr", avatar: "1029384756" },
        { name: "Lucas", email: "lucas.dubois@yahoo.com", avatar: "5647382910" },
        { name: "Emma", email: "emma.bernard@gmail.com", avatar: "9988776655" },
        { name: "Thomas", email: "thomas.petit@outlook.com", avatar: "1122334455" },
        { name: "Léa", email: "lea.robert@orange.fr", avatar: "6677889900" },
        { name: "Gabriel", email: "gabriel.richard@gmail.com", avatar: "1231231234" },
        { name: "Chloé", email: "chloe.durand@live.fr", avatar: "4564564567" },
        { name: "Louis", email: "louis.leroy@gmail.com", avatar: "7897897890" },
        { name: "Manon", email: "manon.moreau@free.fr", avatar: "1472583690" },
        { name: "Hugo", email: "hugo.simon@gmail.com", avatar: "3692581470" },
        { name: "Camille", email: "camille.laurent@sfr.fr", avatar: "1593572486" },
        { name: "Nathan", email: "nathan.michel@gmail.com", avatar: "7539514862" },
        { name: "Alice", email: "alice.garcia@icloud.com", avatar: "9517538520" },
        { name: "Léo", email: "leo.david@gmail.com", avatar: "3571592840" },
        { name: "Zoé", email: "zoe.bertrand@yahoo.fr", avatar: "8524569630" },
        { name: "Raphaël", email: "raphael.roux@gmail.com", avatar: "7418529630" },
        { name: "Juliette", email: "juliette.vincent@laposte.net", avatar: "9638527410" },
        { name: "Maël", email: "mael.fournier@gmail.com", avatar: "1597534682" },
        { name: "Sarah", email: "sarah.morel@hotmail.com", avatar: "3579514680" },
        { name: "Paul", email: "paul.girard@gmail.com", avatar: "2584561593" },
        { name: "Inès", email: "ines.andre@orange.fr", avatar: "1478523690" },
        { name: "Ethan", email: "ethan.lefevre@gmail.com", avatar: "3691472580" },
        { name: "Lola", email: "lola.mercier@live.com", avatar: "9513572580" },
        { name: "Noah", email: "noah.dupont@gmail.com", avatar: "7531594862" },
        { name: "Jade", email: "jade.lambert@free.fr", avatar: "8523691470" },
        { name: "Sacha", email: "sacha.bonnet@gmail.com", avatar: "4561237890" },
        { name: "Louise", email: "louise.francois@yahoo.com", avatar: "1237894560" },
        { name: "Adam", email: "adam.martinez@gmail.com", avatar: "7891234560" },
        { name: "Mila", email: "mila.legros@outlook.fr", avatar: "4567891230" }
    ]

    await prisma.user.createMany({
        data: users
    })


})()