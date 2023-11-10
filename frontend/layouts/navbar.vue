<template>
    <div>
        <div class="nav">
            <div>
                <NuxtLink>
                    <i class="fa-solid fa-house"></i>
                </NuxtLink>
            </div>
            <div>
                <p>s</p>
            </div>
        </div>
        <div class="page">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.page {
    margin-left: 100px;
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
    cursor: pointer;
}


/* links */
a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    border-radius: 15px;
    background-color: #fff;
    font-size: 1.15rem;
}

a:hover {
    background-color: #f3f3f3;
}
</style>