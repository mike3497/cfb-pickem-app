<template>
  <tr :class="rowClass">
    <td>{{ formattedDate }}</td>
    <td>
      <label class="label cursor-pointer">
        <div>
          <span v-if="game.homeTeamRank" class="mr-2">{{ game.homeTeamRank }}</span>
          <span class="label-text" :class="{ 'font-bold': game.homeTeamId === game.winningTeamId }">
            {{ game.homeTeam }} {{ game.homeTeamScore }}
          </span>
        </div>
        <input
          v-model="model"
          class="radio"
          type="radio"
          :disabled="true"
          :name="`game-radio-${game.id}`"
          :value="game.homeTeamId"
        />
      </label>
    </td>
    <td>
      <label class="label cursor-pointer">
        <div>
          <span v-if="game.awayTeamRank" class="mr-2">{{ game.awayTeamRank }}</span>
          <span class="label-text" :class="{ 'font-bold': game.awayTeamId === game.winningTeamId }">
            {{ game.awayTeam }} {{ game.awayTeamScore }}
          </span>
        </div>
        <input
          v-model="model"
          class="radio"
          type="radio"
          :disabled="true"
          :name="`game-radio-${game.id}`"
          :value="game.awayTeamId"
        />
      </label>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { Game } from '@/models/game';
import type { Pick } from '@/models/pick';
import { ref, type PropType, onMounted, watch, computed } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  game: {
    type: Object as PropType<Game>,
    required: true
  },
  pick: {
    type: Object as PropType<Pick>,
    default: () => {}
  }
});

const model = ref<number>();

const rowClass = computed<string>(() => {
  if (props.game.winningTeamId) {
    if (props.pick) {
      if (props.pick.teamId === props.game.winningTeamId) {
        return 'bg-green-100';
      } else {
        return 'bg-red-100';
      }
    }
  }

  return '';
});

const formattedDate = computed<string>(() => dayjs(props.game.date).format('MM/DD/YYYY h:mmA'));

watch(
  () => props.pick,
  () => {
    if (props.pick) {
      model.value = props.pick.teamId;
    }
  },
  { deep: true }
);

onMounted(() => {
  if (props.pick) {
    model.value = props.pick.teamId;
  }
});
</script>
