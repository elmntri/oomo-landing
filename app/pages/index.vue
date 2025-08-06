<template>
    <!-- Hero Section -->
    <section class="bg-white text-gray-900 py-20">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-4xl md:text-6xl font-extrabold mb-4">You've tried the protocols. What if the problem is the
                order?</h1>
            <p class="text-lg md:text-xl mb-8">Progress doesn't come from stacking more inputs. It comes from knowing
                when your system is ready, and making decisions that respect your terrain.
            </p>
            <div class="flex flex-col items-center gap-2">
                <Button @click="navigateTo(waitlistUrl, { external: true, open: { target: '_blank' } })" class="px-16">
                    Join the Waitlist for Early Access
                </Button>
            </div>
        </div>
    </section>

    <!-- Intro Section -->
    <!-- Why Most Health Protocols Don't Work Section -->
    <section class="bg-gray-50 py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-6 text-center">Why Most Health Protocols Don't Work</h2>
            <p class="text-center mb-6 text-lg">
                Most people are stuck, not because they're missing tools, but because they're using the <span
                    class="font-semibold italic">right
                    tools at the wrong time.</span>
            </p>
            <p class="text-center mb-12 text-lg">
                Inputs like sunlight, cold exposure, grounding, and even some nutrients from
                food OR supplements can backfire when your system isn't ready.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="flex flex-col items-center text-center">
                    <Icon name="material-symbols:charger-rounded" class="text-3xl" />
                    <h3 class="text-xl font-semibold mb-2">More charge, but no exits</h3>
                    <p>
                        Light or cold raise mitochondrial voltage, but blocked bile, lymph, or fascia trap that energy →
                        inflammation.
                    </p>
                </div>
                <div class="flex flex-col items-center text-center">
                    <Icon name="fluent:food-28-filled" class="text-3xl" />
                    <h3 class="text-xl font-semibold mb-2">More nutrients, but no structure</h3>
                    <p>
                        Without membrane integrity or fascia tone→ nutrients recirculate or irritate.
                    </p>
                </div>
                <div class="flex flex-col items-center text-center">
                    <Icon name="material-symbols:cycle-rounded" class="text-3xl" />
                    <h3 class="text-xl font-semibold mb-2">More hacks, but no coherence</h3>
                    <p>
                        Stacked inputs without rhythmic alignment create noise, not healing.
                    </p>
                </div>
            </div>
            <p class="text-center mt-8 text-lg font-medium">
                You don't need someone else's formula. You need a plan you can trust to meet you where you are.
            </p>
        </div>
    </section>

    <!-- What Makes oomo Different Section -->
    <section class="bg-gray-50 py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-6 text-center">What Makes oomo Different</h2>
            <p class="text-center mb-8 text-lg">
                We don't optimize hacks. We help you take control by rebuilding the foundation your system depends on.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="flex flex-col items-center text-center">
                    <Icon name="material-symbols:body-system" class="text-3xl" />
                    <h3 class="text-xl font-semibold mb-2">Start with Your Body's 'Operating System'</h3>
                    <p>
                        It's not that other protocols miss the pieces. It's that they skip the system required to make
                        them work cohesively.
                    </p>
                </div>
                <div class="flex flex-col items-center text-center">
                    <Icon name="ic:baseline-terrain" class="text-3xl" />
                    <h3 class="text-xl font-semibold mb-2">Fix the Terrain Before the Inputs</h3>
                    <p>
                        When your body can't receive, it can't regulate or repair correctly. We help you restore that
                        readiness, on your terms.
                    </p>
                </div>
                <div class="flex flex-col items-center text-center">
                    <Icon name="fluent:ink-stroke-arrow-up-down-24-filled" class="text-3xl" />
                    <h3 class="text-xl font-semibold mb-2">Build Oscillation, Not Rigidity</h3>
                    <p>
                        Real health is about flexibility. We help you rebuild the capacity to adapt, not follow rules
                        blindly.
                    </p>
                </div>
            </div>
            <p class="text-center mt-8 text-lg font-medium">
                This is systems thinking, in your hands.
            </p>
        </div>
    </section>

    <!-- Sound Abstract Section -->
    <section class="bg-white py-16">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-6 text-center">Sound Abstract? Let's Make It Real.</h2>
            <div class="space-y-6 text-lg">
                <div class="flex justify-center">
                    <div class="bg-gray-50 rounded-lg p-6 text-center max-w-fit">
                        <p class="italic">"Before you soak up more sun, make sure your system knows what to do with it."
                        </p>
                    </div>
                </div>
                <div class="flex justify-center">
                    <div class="bg-gray-50 rounded-lg p-6 text-center max-w-fit">
                        <p class="italic">"You might feel worse from cold exposure, not because it's bad, but because
                            your
                            exits aren't open."</p>
                    </div>
                </div>
                <div class="flex justify-center">
                    <div class="bg-gray-50 rounded-lg p-6 text-center max-w-fit">
                        <p class="italic">"Even the 'best' supplements can dysregulate your system if your timing is
                            off."
                        </p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-8">
                <p class="text-xl font-medium mb-2">You're not broken. You've just been flying blind.</p>
                <p class="text-lg">We give you the map, but you stay in the driver's seat.</p>
            </div>
        </div>
    </section>

    <!-- Final CTA Section -->
    <section class="bg-gray-50 py-16">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl font-bold mb-4">Take back control of your health, without the guesswork.</h2>
            <p class="text-lg mb-8">Get a terrain-matched plan that puts you back in charge of what your body needs
                next.</p>
            <Button @click="navigateTo(waitlistUrl, { external: true, open: { target: '_blank' } })" class="px-16">
                Join the
                Waitlist </Button>
        </div>
    </section>
</template>

<script setup>
definePageMeta({
    title: 'Oomo - You\'ve tried the protocols. What if the problem is the order?',
    meta: [
        {
            name: 'description',
            content: 'Progress doesn\'t come from stacking more inputs. It comes from knowing when your system is ready, and making decisions that respect your body\'s terrain.',
        },
    ],
    layout: 'full-screen',
})

const waitlistUrl = 'https://form.typeform.com/to/C4GVswz7'

const social = {
    facebook: 'https://www.facebook.com/OOMOHealth',
    twitter: 'https://x.com/OOMOHealth',
    instagram: 'https://www.instagram.com/oomo.official/',
}

onMounted(() => {
    // Check if script is already loaded
    if (!document.querySelector('script[src*="embed.typeform.com"]')) {
        const script = document.createElement('script')
        script.src = '//embed.typeform.com/next/embed.js'
        script.async = true
        document.head.appendChild(script)
    }
})
</script>
