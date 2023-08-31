<template>
  <header class="bg-primary text-white">
    <div class="navbar container mx-auto">
      <div class="flex-1">
        <RouterLink :to="{ name: 'home' }" class="flex items-center text-xl font-bold">
          <span class="material-symbols-outlined mr-2"> sports_football </span>My CFB Pick'em
        </RouterLink>
      </div>
      <!-- <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><a>Link</a></li>
        </ul>
      </div> -->
    </div>
  </header>
</template>
