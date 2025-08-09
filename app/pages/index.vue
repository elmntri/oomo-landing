<template>
    <div class="min-h-screen bg-white text-black overflow-x-hidden">
        <!-- Brand Header -->
        <header class="brand-header">
            <div class="brand-logo">
                <img src="/logo.svg" alt="OOMO" class="logo-image" />
            </div>
        </header>

        <!-- Social Links (Desktop) -->
        <div class="social-links">
            <a :href="social.twitter" class="social-link" title="X (Twitter)" aria-label="Follow OOMO on X"
                target="_blank" rel="noopener noreferrer">
                <Icon name="lucide:twitter" class="w-4 h-4" />
            </a>
            <a :href="social.instagram" class="social-link" title="Instagram" aria-label="Follow OOMO on Instagram"
                target="_blank" rel="noopener noreferrer">
                <Icon name="lucide:instagram" class="w-4 h-4" />
            </a>
            <a :href="social.facebook" class="social-link" title="Facebook" aria-label="Follow OOMO on Facebook"
                target="_blank" rel="noopener noreferrer">
                <Icon name="lucide:facebook" class="w-4 h-4" />
            </a>
        </div>

        <!-- Floating CTA -->
        <div class="floating-cta" :class="{ visible: showFloatingCta }">
            <Button @click="navigateTo(assessmentUrl)" class="floating-cta-button">
                Discover My Terrain Readiness
            </Button>
        </div>

        <!-- Section 1: Hero -->
        <section class="section">
            <div class="container">
                <div class="section-content">
                    <h1 class="main-headline">You've done everything right. So why aren't you better?</h1>

                    <div class="health-items">
                        <div class="health-item">Clean diet ✓</div>
                        <div class="health-item">Sunlight ✓</div>
                        <div class="health-item">Grounding ✓</div>
                        <div class="health-item">Supplements ✓</div>
                    </div>

                    <p class="persist-text">And yet symptoms persist. Maybe getting worse.</p>
                </div>
            </div>
        </section>

        <!-- Section 2: Problem -->
        <section class="section">
            <div class="container">
                <div class="section-content">
                    <h2 class="section-headline">Your tools are not wrong. Your body just might not be ready.</h2>

                    <p class="body-text">When your body and terrain isn't ready to:</p>

                    <ul class="tools-list">
                        <li>❌ Receive</li>
                        <li>❌ Direct</li>
                        <li>❌ Clear</li>
                    </ul>

                    <div class="more-better">More ≠ Better</div>
                </div>
            </div>
        </section>

        <!-- Section 3: Solution & CTA -->
        <section class="section">
            <div class="container">
                <div class="section-content">
                    <h2 class="section-headline">Don't just stack protocols. <span
                            class="sequence-emphasis">Sequence</span> them.</h2>

                    <p class="subtitle">Find out your terrain readiness. It's your starting point for healing.</p>

                    <p class="time-emphasis">In Just 5 Minutes.</p>

                    <div class="cta-buttons">
                        <Button @click="navigateTo(assessmentUrl)" class="cta-button">
                            Discover My Terrain Readiness
                        </Button>
                    </div>

                    <!-- Mobile social links -->
                    <div class="mobile-social">
                        <a :href="social.twitter" class="social-link" title="X (Twitter)" target="_blank"
                            rel="noopener noreferrer">
                            <Icon name="lucide:twitter" class="w-4 h-4" />
                        </a>
                        <a :href="social.instagram" class="social-link" title="Instagram" target="_blank"
                            rel="noopener noreferrer">
                            <Icon name="lucide:instagram" class="w-4 h-4" />
                        </a>
                        <a :href="social.facebook" class="social-link" title="Facebook" target="_blank"
                            rel="noopener noreferrer">
                            <Icon name="lucide:facebook" class="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
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
})

const assessmentUrl = '/assessment'
const showFloatingCta = ref(false)

const social = {
    facebook: 'https://www.facebook.com/OOMOHealth',
    twitter: 'https://x.com/OOMOHealth',
    instagram: 'https://www.instagram.com/oomo.official/',
}


onMounted(() => {
    // Handle floating CTA visibility based on scroll
    const handleScroll = () => {
        const scrolled = window.pageYOffset
        const windowHeight = window.innerHeight

        if (scrolled > windowHeight * 0.5) {
            showFloatingCta.value = true
        } else {
            showFloatingCta.value = false
        }
    }

    window.addEventListener('scroll', handleScroll)

    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in')
            }
        })
    }, observerOptions)

    document.querySelectorAll('.section-content').forEach(section => {
        observer.observe(section)
    })

    // Cleanup
    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
        observer.disconnect()
    })
})
</script>

<style scoped>
/* Brand Header */
.brand-header {
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(10, 10, 10, 0.1);
    border-radius: 50px;
    padding: 15px 30px;
}

.brand-logo {
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-image {
    height: 35px;
    width: auto;
}

/* Layout */
.container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
}

.section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 120px 0 80px 0;
    position: relative;
}

.section-content {
    text-align: center;
    z-index: 2;
    opacity: 0;
    transform: translateY(50px);
    animation: fadeInUp 1s ease-out forwards;
    position: relative;
}

.section:nth-child(3) .section-content {
    animation-delay: 0.3s;
}

.section:nth-child(4) .section-content {
    animation-delay: 0.6s;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Typography */
.main-headline {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 2rem;
    color: #0a0a0a;
    letter-spacing: -0.03em;
}

.section-headline {
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 2rem;
    color: #0a0a0a;
    letter-spacing: -0.02em;
}

.body-text {
    font-size: clamp(1.3rem, 3vw, 2rem);
    font-weight: 400;
    color: #64748b;
    margin-bottom: 2rem;
    line-height: 1.5;
    letter-spacing: -0.01em;
}

.subtitle {
    font-size: clamp(1.4rem, 3.5vw, 2.2rem);
    font-weight: 500;
    color: #0a0a0a;
    margin: 2rem 0;
    line-height: 1.4;
    letter-spacing: -0.01em;
}

.time-emphasis {
    font-size: clamp(1.6rem, 4vw, 2.8rem);
    font-weight: 700;
    color: #dc2626;
    margin-bottom: 3rem;
    letter-spacing: -0.01em;
}

.persist-text {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 600;
    color: #dc2626;
    margin-top: 3rem;
    letter-spacing: -0.01em;
}

.more-better {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    margin-top: 4rem;
    color: #0a0a0a;
    letter-spacing: 0.05em;
}

.sequence-emphasis {
    color: #dc2626;
    font-weight: 800;
    letter-spacing: 0.05em;
    position: relative;
}

.sequence-emphasis::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #dc2626;
    border-radius: 2px;
}

/* Health Items Grid */
.health-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin: 3rem 0;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
}

.health-item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 500;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
    color: #0a0a0a;
}

.health-item:hover {
    transform: translateY(-5px);
    border-color: #cbd5e1;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Tools List */
.tools-list {
    list-style: none;
    margin: 3rem 0;
    font-size: clamp(1.4rem, 3.5vw, 2.2rem);
    font-weight: 600;
}

.tools-list li {
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dc2626;
    position: relative;
}

.tools-list li::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 1px;
    background: #e2e8f0;
    bottom: -15px;
}

/* Buttons */
.cta-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 2rem;
}

.cta-button {
    padding: 20px 50px !important;
    font-size: clamp(1rem, 2.2vw, 1.2rem) !important;
    font-weight: 600 !important;
    letter-spacing: 0.05em !important;
    color: #ffffff !important;
    background: #0a0a0a !important;
    border: none !important;
    border-radius: 50px !important;
    cursor: pointer;
    transition: all 0.3s ease !important;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    margin: 0 10px;
}

.cta-button:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
    background: #1a1a1a !important;
}

/* Floating CTA */
.floating-cta {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1000;
    opacity: 0;
    transform: translateY(100px);
    transition: all 0.4s ease;
}

.floating-cta.visible {
    opacity: 1;
    transform: translateY(0);
}

.floating-cta-button {
    padding: 16px 32px !important;
    font-size: 0.9rem !important;
    font-weight: 600 !important;
    letter-spacing: 0.05em !important;
    color: #ffffff !important;
    background: #0a0a0a !important;
    border: none !important;
    border-radius: 50px !important;
    transition: all 0.3s ease !important;
}

.floating-cta-button:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
    background: #1a1a1a !important;
}

/* Social Links */
.social-links {
    position: fixed;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 1000;
}

.social-link {
    width: 50px;
    height: 50px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.social-link:hover {
    border-color: #0a0a0a;
    transform: scale(1.1);
    color: #0a0a0a;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

/* Mobile Social */
.mobile-social {
    display: none;
}

/* Geometric Accents */
.section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100px;
    background: #e2e8f0;
    z-index: 1;
}

.section:first-child::before {
    display: none;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .health-items {
        grid-template-columns: 1fr;
        max-width: 350px;
    }

    .section {
        padding: 100px 0 60px 0;
    }

    .social-links:not(.mobile-social) {
        display: none;
    }

    .mobile-social {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 20px;
        margin: 3rem 0 0 0;
    }

    .floating-cta {
        bottom: 20px;
        right: 20px;
    }

    .floating-cta-button {
        padding: 14px 28px !important;
        font-size: 0.8rem !important;
    }

    .brand-header {
        top: 20px;
        padding: 12px 25px;
    }

    .logo-image {
        height: 28px;
    }

    .section::before {
        display: none;
    }
}

@media (max-width: 600px) {
    .cta-buttons {
        flex-direction: column;
        align-items: center;
    }

    .cta-button {
        width: 100%;
        max-width: 320px;
        margin: 10px 0;
    }
}
</style>
