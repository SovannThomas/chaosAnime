<template>
    <div id="box">
        <Card v-for="item in data" :key="item.title" :title="item.title" :description="item.description"/>
    </div>
</template>


<script setup >
    import Card from '../components/Card.vue'

    let data = [{
        title: "Baruto",
        description: "L'histoire d'un ninja qui prefere faire la guerre plutot que d'avoue ses sentiments à la demoiselle timide en kiffe sur lui"
    },
    {
        title: "Blitch",
        description: "L'histoire d'une organisation de nettoyeur , qui ont des pouvoir selon l'ustencil de ménage maitriser "
    },
    {
        title: " Assasination Bathroom",
        description: "L'histoire d'une classe qui doit manger son prof le pouple , mais il se laisse pas tuer"
    },
    {
        title: " Deux pieces",
        description: "L'histoire d'un pirate botoxé qui ne sait pas nager, et qui cherche a devenir le roi des pirates esthetiques"
    },
    { 
        title: " Defense des nains",
        description : "L'histoire d'un groupe de nain acrobatique qui sont attaquée par l'armée de l'air des hommes "

    },
    {
        title : "Caillou le docteur",
        description : "L'histoire d'un caillou qui est pas vraiment docteur , et qui cherche a decailloufier les autres cailloux "
    }
    ]

</script>

<style>
    #box {
        display: flex;
        flex-wrap: wrap;
        margin: 20px;
    }
</style>