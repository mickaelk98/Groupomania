<script setup>
</script>

<template>
    <div class="post">
        <div class="img-name">
            <img src="../assets/images/default.jpg" alt="photo de profil">
            <p>john doe</p>
        </div>

        <!-- boutton de modification et suppression de post -->
        <div class="update-delete-btn">
            <button class="btn btn-update">Modifier</button>
            <button class="btn btn-delete">Supprimer</button>
        </div>

        <!-- image du post -->
        <img src="../assets/images/default.jpg" alt="image du post" class="post-image">

        <!-- message du post -->
        <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Praesentium dolore quibusdam deleniti voluptas illum eaque?
             Voluptas saepe facilis nostrum repudiandae quasi accusamus at 
            vitae neque, assumenda sit illum perferendis beatae.
        </p>

        <!-- like et commentaire -->
        <div class="like-comment">
            <span><i class="far fa-heart"></i> 50 likes </span>
            <span><i class="far fa-comment"></i> commentaire</span>
        </div>

        <!-- mettre un commentaire -->
        <form>
            <textarea placeholder="Mettre uncommentaire"></textarea>
            <button>Envoyer</button>
        </form>

        <!-- commentaire du post -->
        <div class="all-comment" >
            <p class="comment">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                nblanditiis veritatis asperiores sapiente amet culpa nobis?
            </p>
            <p class="comment">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                nblanditiis veritatis asperiores sapiente amet culpa nobis?
            </p>
            <p class="comment">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                nblanditiis veritatis asperiores sapiente amet culpa nobis?
            </p>
            <p class="comment">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                nblanditiis veritatis asperiores sapiente amet culpa nobis?
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/sass/components/post';
</style>