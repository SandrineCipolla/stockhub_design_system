import './sh-header.ts';
import type {Meta, StoryObj} from "@storybook/web-components";

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
