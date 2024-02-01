<template>
    <div>
        <div class="nav">
            <div>
                <NuxtLink to="/">
                    <i class="fa-solid fa-house"></i>
                </NuxtLink>
                <NuxtLink to="/feed">
                    <i class="fa-solid fa-video"></i>
                </NuxtLink>
            </div>
            <div>
                <NuxtLink to="/settings">
                    <i class="fa-solid fa-gear"></i>
                </NuxtLink>
            </div>
        </div>
        <div class="page">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.page {
    margin-left: 80px;
}

/* navbar */
.nav {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 80px;
    background-color: #5cc4ca;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0px;
    /* cursor: pointer; */
}


/* links */
a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    border-radius: 7px;
    background-color: #fff;
    font-size: 1.15rem;
    color: black;
    text-decoration: none;
}

a:hover {
    background-color: #f3f3f3;
}

a:not(:last-child) {
    margin-bottom: 15px;
}
</style>