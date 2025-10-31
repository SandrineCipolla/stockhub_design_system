import './sh-header.ts';
import type {Meta, StoryObj} from "@storybook/web-components";
import { expect, userEvent } from '@storybook/test';

const meta: Meta = {
    title: 'Components/Organisms/Header',
    component: 'sh-header',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        userName: {
            control: 'text',
            description: "Nom de l'utilisateur affiché dans le header",
        },
        notificationCount: {
            control: 'number',
            description: "Nombre de notifications non lues (0 = pas de badge)",
        },
        theme: {
            control: 'select',
            options: ['light', 'dark'],
            description: "Thème du header (light ou dark)",
        },
        isLoggedIn: {
            control: 'boolean',
            description: "État de connexion (true = Logout affiché, false = Login affiché)",
        },
    },
};
export default meta;

type Story = StoryObj;

// Helper function to create wrapper with theme listener
const createStoryWithThemeListener = (id: string, content: string, extraScript = '', initialTheme: 'light' | 'dark' = 'dark') => {
    const bgColor = initialTheme === 'dark'
        ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)'
        : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)';
    const textColor = initialTheme === 'dark' ? '#ffffff' : '#1e293b';

    return `
    <div id="wrapper-${id}" style="background: ${bgColor}; min-height: 100vh; color: ${textColor};">
        ${content}
    </div>
    <script>
        (function() {
            const wrapper = document.getElementById('wrapper-${id}');
            const header = document.getElementById('header-${id}');

            // Update wrapper theme based on header's data-theme
            function updateWrapperTheme() {
                const theme = header?.getAttribute('data-theme') || 'dark';
                if (wrapper) {
                    if (theme === 'dark') {
                        wrapper.style.background = 'linear-gradient(to bottom right, #0f172a, #1e1b4b)';
                        wrapper.style.color = '#ffffff';
                    } else {
                        wrapper.style.background = 'linear-gradient(to bottom right, #f8fafc, #f0ebff)';
                        wrapper.style.color = '#1e293b';
                    }
                }
            }

            // Wait for web component to be fully defined before reading attributes
            customElements.whenDefined('sh-header').then(() => {
                // Force initial theme if specified
                if (header && '${initialTheme}' === 'light') {
                    header.theme = 'light';
                }
                // Small delay to ensure attributes are set
                setTimeout(() => {
                    updateWrapperTheme();
                }, 0);
            });

            // Listen for global theme change from header
            document.addEventListener('theme-change', (e) => {
                const newTheme = e.detail.theme;
                if (header) {
                    header.setAttribute('data-theme', newTheme);
                }
                updateWrapperTheme();
            });

            ${extraScript}
        })();
    </script>
`;
};

// Default Header - Logged In
export const Default: Story = {
    args: {
        userName: 'Sandrine Cipolla',
        notificationCount: 3,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => createStoryWithThemeListener('default', `
        <sh-header
            id="header-default"
            user-name="${args.userName}"
            notification-count="${args.notificationCount}"
            data-theme="${args.theme}"
            ${args.isLoggedIn ? 'isLoggedIn' : ''}
        ></sh-header>
        <div style="padding: 6rem 2rem 2rem 2rem;">
            <h2>Page Content</h2>
            <p>Scroll down to see the sticky header effect...</p>
            <div style="height: 150vh;"></div>
        </div>
    `, `
        if (header) {
            header.addEventListener('sh-logout-click', () => {
                header.removeAttribute('isLoggedIn');
            });
            header.addEventListener('sh-login-click', () => {
                header.setAttribute('isLoggedIn', '');
            });
        }
    `),
};

// Logged Out State
export const LoggedOut: Story = {
    args: {
        userName: 'Guest',
        notificationCount: 0,
        theme: 'dark',
        isLoggedIn: false,
    },
    render: (args) => createStoryWithThemeListener('loggedout', `
        <sh-header
            id="header-loggedout"
            user-name="${args.userName}"
            notification-count="${args.notificationCount}"
            data-theme="${args.theme}"
        ></sh-header>
        <div style="padding: 6rem 2rem 2rem 2rem;">
            <h2>Logged Out State</h2>
            <p>When isLoggedIn=false, the header shows "Login" button. Click it to log in!</p>
        </div>
    `, `
        // Force isLoggedIn to false via JavaScript property (boolean attribute issue)
        if (header) {
            header.isLoggedIn = false;

            header.addEventListener('sh-logout-click', () => {
                header.isLoggedIn = false;
            });
            header.addEventListener('sh-login-click', () => {
                header.isLoggedIn = true;
                header.setAttribute('user-name', 'Sandrine Cipolla');
            });
        }
    `),
};

// With Many Notifications
export const ManyNotifications: Story = {
    args: {
        userName: 'John Doe',
        notificationCount: 42,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => createStoryWithThemeListener('many', `
        <sh-header
            id="header-many"
            user-name="${args.userName}"
            notification-count="${args.notificationCount}"
            data-theme="${args.theme}"
            ${args.isLoggedIn ? 'isLoggedIn' : ''}
        ></sh-header>
        <div style="padding: 6rem 2rem 2rem 2rem;">
            <h2>42 Notifications</h2>
            <p>The notification badge displays the count.</p>
        </div>
    `),
};

// With 99+ Notifications
export const MaxNotifications: Story = {
    args: {
        userName: 'Jane Smith',
        notificationCount: 150,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => createStoryWithThemeListener('max', `
        <sh-header
            id="header-max"
            user-name="${args.userName}"
            notification-count="${args.notificationCount}"
            data-theme="${args.theme}"
            ${args.isLoggedIn ? 'isLoggedIn' : ''}
        ></sh-header>
        <div style="padding: 6rem 2rem 2rem 2rem;">
            <h2>99+ Notifications</h2>
            <p>When count exceeds 99, it displays "99+"</p>
        </div>
    `),
};

// No Notifications
export const NoNotifications: Story = {
    args: {
        userName: 'Alex Johnson',
        notificationCount: 0,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => createStoryWithThemeListener('none', `
        <sh-header
            id="header-none"
            user-name="${args.userName}"
            notification-count="${args.notificationCount}"
            data-theme="${args.theme}"
            ${args.isLoggedIn ? 'isLoggedIn' : ''}
        ></sh-header>
        <div style="padding: 6rem 2rem 2rem 2rem;">
            <h2>No Notifications</h2>
            <p>When count is 0, no badge is shown.</p>
        </div>
    `),
};

// With Event Listeners
export const WithEventListeners: Story = {
    args: {
        userName: 'Interactive User',
        notificationCount: 7,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => createStoryWithThemeListener('interactive', `
        <sh-header
            id="header-interactive"
            user-name="${args.userName}"
            notification-count="${args.notificationCount}"
            data-theme="${args.theme}"
            ${args.isLoggedIn ? 'isLoggedIn' : ''}
        ></sh-header>
        <div style="padding: 6rem 2rem 2rem 2rem;">
            <h2 style="color: var(--text);">Interactive Event Demo</h2>
            <p>Click on the header buttons to see the events being fired:</p>
            <div id="event-log" style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; font-family: 'Courier New', monospace; min-height: 300px; border: 1px solid rgba(255,255,255,0.1); max-height: 400px; overflow-y: auto;">
                <p style="color: #9ca3af; margin: 0;">👆 Click on header buttons to see events...</p>
            </div>
        </div>
    `, `
        const log = document.getElementById('event-log');
        if (header && log) {
            header.addEventListener('sh-notification-click', (e) => {
                const p = document.createElement('p');
                p.style.cssText = 'color: #60a5fa; margin: 0.5rem 0; padding: 0.5rem; background: rgba(96, 165, 250, 0.1); border-radius: 4px;';
                p.textContent = '🔔 sh-notification-click | count: ' + e.detail.count + ' | ' + new Date().toLocaleTimeString();
                log.insertBefore(p, log.children[1] || log.firstChild);
            });

            header.addEventListener('sh-theme-toggle', (e) => {
                const p = document.createElement('p');
                p.style.cssText = 'color: #fbbf24; margin: 0.5rem 0; padding: 0.5rem; background: rgba(251, 191, 36, 0.1); border-radius: 4px;';
                p.textContent = '🎨 sh-theme-toggle | ' + e.detail.previousTheme + ' → ' + e.detail.newTheme + ' | ' + new Date().toLocaleTimeString();
                log.insertBefore(p, log.children[1] || log.firstChild);
            });

            document.addEventListener('theme-change', (e) => {
                const p = document.createElement('p');
                p.style.cssText = 'color: #34d399; margin: 0.5rem 0; padding: 0.5rem; background: rgba(52, 211, 153, 0.1); border-radius: 4px;';
                p.textContent = '🌍 GLOBAL theme-change on document | theme: ' + e.detail.theme + ' | ' + new Date().toLocaleTimeString();
                log.insertBefore(p, log.children[1] || log.firstChild);
            });

            header.addEventListener('sh-logout-click', (e) => {
                const p = document.createElement('p');
                p.style.cssText = 'color: #f87171; margin: 0.5rem 0; padding: 0.5rem; background: rgba(248, 113, 113, 0.1); border-radius: 4px;';
                p.textContent = '👤 sh-logout-click | user: ' + e.detail.userName + ' | ' + new Date().toLocaleTimeString();
                log.insertBefore(p, log.children[1] || log.firstChild);
            });
        }
    `),
};

// Playground
export const Playground: Story = {
    args: {
        userName: 'Sandrine Cipolla',
        notificationCount: 3,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => createStoryWithThemeListener('playground', `
        <sh-header
            id="header-playground"
            user-name="${args.userName}"
            notification-count="${args.notificationCount}"
            data-theme="${args.theme}"
            ${args.isLoggedIn ? 'isLoggedIn' : ''}
        ></sh-header>
        <div style="padding: 6rem 2rem 2rem 2rem;">
            <h2>Playground</h2>
            <p>Use the controls below to customize the header properties.</p>
        </div>
    `),
};

/**
 * Test d'interaction : teste le click sur le bouton notification.
 * Vérifie que l'événement sh-notification-click est émis avec le count.
 */
export const InteractionTestNotificationClick: Story = {
    args: {
        userName: 'Test User',
        notificationCount: 5,
        theme: 'dark',
        isLoggedIn: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Teste le click sur le bouton notification et vérifie que l'événement sh-notification-click est émis avec le count. Voir l'onglet 'Interactions'."
            }
        }
    },
    render: (args) => `
        <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 400px; color: #ffffff;">
            <sh-header
                id="test-notification-header"
                user-name="${args.userName}"
                notification-count="${args.notificationCount}"
                data-theme="${args.theme}"
                isLoggedIn
            ></sh-header>
            <div style="padding: 2rem;">
                <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center; margin-top: 2rem;">
                    ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
                </div>
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            await customElements.whenDefined('sh-header');
            await new Promise(resolve => setTimeout(resolve, 200));

            const shHeader = canvasElement.querySelector('#test-notification-header') as any;
            await expect(shHeader).toBeInTheDocument();

            // Accéder au bouton notification dans le Shadow DOM
            const notificationBtn = shHeader.shadowRoot?.querySelector('.notification-btn') as HTMLButtonElement;
            await expect(notificationBtn).toBeTruthy();

            // Vérifier que le badge est visible
            const badge = shHeader.shadowRoot?.querySelector('.notification-badge') as HTMLElement;
            await expect(badge).toBeTruthy();
            await expect(badge.textContent?.trim()).toBe('5');

            // Écouter l'événement
            let eventFired = false;
            let eventCount = 0;
            shHeader.addEventListener('sh-notification-click', ((e: CustomEvent) => {
                eventFired = true;
                eventCount = e.detail.count;
            }) as EventListener);

            // Cliquer sur le bouton notification
            await userEvent.click(notificationBtn);
            await new Promise(resolve => setTimeout(resolve, 100));

            // Vérifier que l'événement a été émis
            await expect(eventFired).toBe(true);
            await expect(eventCount).toBe(5);

            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! Événement sh-notification-click émis avec count=5.';
            }
        } catch (error) {
            if (resultDiv) {
                resultDiv.style.color = '#ef4444';
                resultDiv.innerHTML = `❌ Test échoué : ${error}`;
            }
            throw error;
        }
    },
};

/**
 * Test d'interaction : teste le toggle de thème.
 * Vérifie les événements sh-theme-toggle et theme-change (document), et le changement d'icône.
 */
export const InteractionTestThemeToggle: Story = {
    args: {
        userName: 'Test User',
        notificationCount: 0,
        theme: 'dark',
        isLoggedIn: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Teste le toggle de thème : click → événements sh-theme-toggle + theme-change (document) + changement d'icône Sun/Moon."
            }
        }
    },
    render: (args) => `
        <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 400px; color: #ffffff;">
            <sh-header
                id="test-theme-header"
                user-name="${args.userName}"
                notification-count="${args.notificationCount}"
                data-theme="${args.theme}"
                isLoggedIn
            ></sh-header>
            <div style="padding: 2rem;">
                <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center; margin-top: 2rem;">
                    ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
                </div>
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            await customElements.whenDefined('sh-header');
            await customElements.whenDefined('sh-button');
            await new Promise(resolve => setTimeout(resolve, 200));

            const shHeader = canvasElement.querySelector('#test-theme-header') as any;
            await expect(shHeader).toBeInTheDocument();
            await expect(shHeader.theme).toBe('dark');

            // Trouver le bouton de thème (sh-button avec icon-before="Sun")
            const themeButtons = Array.from(shHeader.shadowRoot?.querySelectorAll('sh-button') || []) as any[];
            const themeButton = themeButtons.find(btn => {
                const iconBefore = btn.getAttribute('icon-before');
                return iconBefore === 'Sun' || iconBefore === 'Moon';
            });
            await expect(themeButton).toBeTruthy();

            // Vérifier l'icône initiale (dark theme = Sun)
            await expect(themeButton.getAttribute('icon-before')).toBe('Sun');

            // Écouter les événements
            let themeToggleEventFired = false;
            let themeToggleDetail: any = null;
            let documentEventFired = false;
            let documentEventDetail: any = null;

            shHeader.addEventListener('sh-theme-toggle', ((e: CustomEvent) => {
                themeToggleEventFired = true;
                themeToggleDetail = e.detail;
            }) as EventListener);

            document.addEventListener('theme-change', ((e: CustomEvent) => {
                documentEventFired = true;
                documentEventDetail = e.detail;
            }) as EventListener);

            // Cliquer sur le bouton de thème (cliquer sur l'élément interne dans le shadow DOM)
            const buttonElement = themeButton.shadowRoot?.querySelector('button') as HTMLButtonElement;
            await expect(buttonElement).toBeTruthy();
            await userEvent.click(buttonElement);
            await new Promise(resolve => setTimeout(resolve, 150));

            // Vérifier les événements
            await expect(themeToggleEventFired).toBe(true);
            await expect(themeToggleDetail.previousTheme).toBe('dark');
            await expect(themeToggleDetail.newTheme).toBe('light');
            await expect(documentEventFired).toBe(true);
            await expect(documentEventDetail.theme).toBe('light');

            // Vérifier que le thème a changé
            await expect(shHeader.theme).toBe('light');

            // Vérifier que l'icône a changé (light theme = Moon)
            await expect(themeButton.getAttribute('icon-before')).toBe('Moon');

            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! Theme dark→light, icône Sun→Moon, événements émis.';
            }
        } catch (error) {
            if (resultDiv) {
                resultDiv.style.color = '#ef4444';
                resultDiv.innerHTML = `❌ Test échoué : ${error}`;
            }
            throw error;
        }
    },
};

/**
 * Test d'interaction : teste le click sur le bouton logout.
 * Vérifie que l'événement sh-logout-click est émis quand isLoggedIn=true.
 */
export const InteractionTestLogoutClick: Story = {
    args: {
        userName: 'John Doe',
        notificationCount: 0,
        theme: 'dark',
        isLoggedIn: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Teste le click sur le bouton logout (quand isLoggedIn=true) et vérifie que l'événement sh-logout-click est émis."
            }
        }
    },
    render: (args) => `
        <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 400px; color: #ffffff;">
            <sh-header
                id="test-logout-header"
                user-name="${args.userName}"
                notification-count="${args.notificationCount}"
                data-theme="${args.theme}"
                isLoggedIn
            ></sh-header>
            <div style="padding: 2rem;">
                <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center; margin-top: 2rem;">
                    ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
                </div>
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            await customElements.whenDefined('sh-header');
            await customElements.whenDefined('sh-button');
            await new Promise(resolve => setTimeout(resolve, 200));

            const shHeader = canvasElement.querySelector('#test-logout-header') as any;
            await expect(shHeader).toBeInTheDocument();
            await expect(shHeader.isLoggedIn).toBe(true);

            // Trouver le bouton logout (sh-button avec icon-before="LogOut")
            const buttons = Array.from(shHeader.shadowRoot?.querySelectorAll('sh-button') || []) as any[];
            const logoutButton = buttons.find(btn => btn.getAttribute('icon-before') === 'LogOut');
            await expect(logoutButton).toBeTruthy();

            // Écouter l'événement
            let eventFired = false;
            let userName = '';
            shHeader.addEventListener('sh-logout-click', ((e: CustomEvent) => {
                eventFired = true;
                userName = e.detail.userName;
            }) as EventListener);

            // Cliquer sur le bouton logout
            const buttonElement = logoutButton.shadowRoot?.querySelector('button') as HTMLButtonElement;
            await expect(buttonElement).toBeTruthy();
            await userEvent.click(buttonElement);
            await new Promise(resolve => setTimeout(resolve, 100));

            // Vérifier l'événement
            await expect(eventFired).toBe(true);
            await expect(userName).toBe('John Doe');

            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! Événement sh-logout-click émis avec userName.';
            }
        } catch (error) {
            if (resultDiv) {
                resultDiv.style.color = '#ef4444';
                resultDiv.innerHTML = `❌ Test échoué : ${error}`;
            }
            throw error;
        }
    },
};

/**
 * Test d'interaction : teste le click sur le bouton login.
 * Vérifie que l'événement sh-login-click est émis quand isLoggedIn=false.
 */
export const InteractionTestLoginClick: Story = {
    args: {
        userName: 'Guest',
        notificationCount: 0,
        theme: 'dark',
        isLoggedIn: false,
    },
    parameters: {
        docs: {
            description: {
                story: "Teste le click sur le bouton login (quand isLoggedIn=false) et vérifie que l'événement sh-login-click est émis."
            }
        }
    },
    render: (args) => `
        <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 400px; color: #ffffff;">
            <sh-header
                id="test-login-header"
                user-name="${args.userName}"
                notification-count="${args.notificationCount}"
                data-theme="${args.theme}"
            ></sh-header>
            <div style="padding: 2rem;">
                <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center; margin-top: 2rem;">
                    ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
                </div>
            </div>
        </div>
        <script>
            customElements.whenDefined('sh-header').then(() => {
                const header = document.getElementById('test-login-header');
                if (header) {
                    header.isLoggedIn = false;
                }
            });
        </script>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            await customElements.whenDefined('sh-header');
            await customElements.whenDefined('sh-button');
            await new Promise(resolve => setTimeout(resolve, 200));

            const shHeader = canvasElement.querySelector('#test-login-header') as any;
            await expect(shHeader).toBeInTheDocument();

            // S'assurer que isLoggedIn est false
            shHeader.isLoggedIn = false;
            await new Promise(resolve => setTimeout(resolve, 100));
            await expect(shHeader.isLoggedIn).toBe(false);

            // Trouver le bouton login (sh-button avec icon-before="LogIn")
            const buttons = Array.from(shHeader.shadowRoot?.querySelectorAll('sh-button') || []) as any[];
            const loginButton = buttons.find(btn => btn.getAttribute('icon-before') === 'LogIn');
            await expect(loginButton).toBeTruthy();

            // Écouter l'événement
            let eventFired = false;
            shHeader.addEventListener('sh-login-click', (() => {
                eventFired = true;
            }) as EventListener);

            // Cliquer sur le bouton login
            const buttonElement = loginButton.shadowRoot?.querySelector('button') as HTMLButtonElement;
            await expect(buttonElement).toBeTruthy();
            await userEvent.click(buttonElement);
            await new Promise(resolve => setTimeout(resolve, 100));

            // Vérifier l'événement
            await expect(eventFired).toBe(true);

            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! Événement sh-login-click émis.';
            }
        } catch (error) {
            if (resultDiv) {
                resultDiv.style.color = '#ef4444';
                resultDiv.innerHTML = `❌ Test échoué : ${error}`;
            }
            throw error;
        }
    },
};

/**
 * Test d'interaction : teste l'affichage du badge "99+".
 * Vérifie que le badge affiche "99+" quand notificationCount > 99.
 */
export const InteractionTestNotificationBadge99Plus: Story = {
    args: {
        userName: 'Test User',
        notificationCount: 150,
        theme: 'dark',
        isLoggedIn: true,
    },
    parameters: {
        docs: {
            description: {
                story: "Teste que le badge notification affiche '99+' quand le count dépasse 99."
            }
        }
    },
    render: (args) => `
        <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 400px; color: #ffffff;">
            <sh-header
                id="test-badge-header"
                user-name="${args.userName}"
                notification-count="${args.notificationCount}"
                data-theme="${args.theme}"
                isLoggedIn
            ></sh-header>
            <div style="padding: 2rem;">
                <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center; margin-top: 2rem;">
                    ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
                </div>
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            await customElements.whenDefined('sh-header');
            await new Promise(resolve => setTimeout(resolve, 200));

            const shHeader = canvasElement.querySelector('#test-badge-header') as any;
            await expect(shHeader).toBeInTheDocument();
            await expect(shHeader.notificationCount).toBe(150);

            // Accéder au badge dans le Shadow DOM
            const badge = shHeader.shadowRoot?.querySelector('.notification-badge') as HTMLElement;
            await expect(badge).toBeTruthy();

            // Vérifier que le badge affiche "99+"
            await expect(badge.textContent?.trim()).toBe('99+');

            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! Badge affiche "99+" pour count=150.';
            }
        } catch (error) {
            if (resultDiv) {
                resultDiv.style.color = '#ef4444';
                resultDiv.innerHTML = `❌ Test échoué : ${error}`;
            }
            throw error;
        }
    },
};
