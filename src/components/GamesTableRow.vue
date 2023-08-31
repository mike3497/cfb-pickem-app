<template>
  <tr :class="rowClass">
    <td>{{ game.date }}</td>
    <td>
      <label class="label cursor-pointer">
        <span class="label-text" :class="{ 'font-bold': game.homeTeamId === game.winningTeamId }">
          {{ game.homeTeam }} {{ game.homeTeamScore }}
        </span>
        <input
          v-model="model"
          class="radio"
          type="radio"
          :disabled="isDisabled"
          :name="`game-radio-${game.id}`"
          :value="game.homeTeamId"
          @change="onChanged"
        />
      </label>
    </td>
    <td>
      <label class="label cursor-pointer">
        <span class="label-text" :class="{ 'font-bold': game.awayTeamId === game.winningTeamId }">
          {{ game.awayTeam }} {{ game.awayTeamScore }}
        </span>
        <input
          v-model="model"
          class="radio"
          type="radio"
          :disabled="isDisabled"
          :name="`game-radio-${game.id}`"
          :value="game.awayTeamId"
          @change="onChanged"
        />
      </label>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { Game } from '@/models/game';
import type { Pick } from '@/models/pick';
import { PickService } from '@/services/pickService';
import { ref, type PropType, onMounted, watch, computed } from 'vue';

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

const isDisabled = computed<boolean>(() => {
  const currentTime: Date = new Date();
  const targetDate: Date = new Date(props.game.date);

  const timeDifference: number = targetDate.getTime() - currentTime.getTime();
  const oneHourInMilliseconds: number = 60 * 60 * 1000;

  if (timeDifference <= oneHourInMilliseconds) {
    return true;
  }

  return false;
});

const onChanged = async () => {
  if (model.value) {
    try {
      await PickService.create(props.game.id, model.value);
    } catch (error: any) {
      console.log(error);
    }
  }
};

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
