<template>
    <button
        class="flex justify-center text-white bg-blue-400 rounded-full hover:bg-blue-500 font-sm disabled:bg-blue-300 disabled:cursor-not-allowed"
        :disabled="props.disabled" :class="classes" @click="handleClick">

        <span :class="textFontSize">
            <slot />
        </span>

    </button>
</template>
<script setup>
// Lets us define the events that our components can emit
const emits = defineEmits(['onClick'])

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        deafault: 'md'
    },
    liquid: {
        type: Boolean,
        deafult: false
    }
})

const paddingClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'py-2 px-3'
        case 'lg':
            return 'px-4 py-3'
        default:
            return 'px-3 py-3'
    }
})

const textFontSize = computed(() => {
    switch (props.size) {
        case 'lg':
            return 'text-md'
        default:
            return 'text-sm'
    }
})

const defaultWidth = computed(() => {
    switch (props.size) {
        default:
            return 'w-min'
    }
})

// computed(): returned value is a computed ref
const classes = computed(() => `${paddingClasses.value} ${props.liquid ? 'w-full' : defaultWidth.value}`)

function handleClick(event) {
    emits('onClick', event)
}

</script>