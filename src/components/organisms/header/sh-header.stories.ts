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

// Default Header - Logged In
export const Default: Story = {
    args: {
        userName: 'Sandrine Cipolla',
        notificationCount: 3,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; min-height: 200vh; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-header
                id="header-default"
                userName="${args.userName}"
                notificationCount="${args.notificationCount}"
                theme="${args.theme}"
                ${args.isLoggedIn ? 'isLoggedIn' : ''}
                data-theme="${args.theme}"
            ></sh-header>
            <div style="padding: 6rem 2rem 2rem 2rem;">
                <h2>Page Content</h2>
                <p>Scroll down to see the sticky header effect...</p>
                <div style="height: 150vh;"></div>
            </div>
        </div>
        <script>
            (function() {
                const header = document.getElementById('header-default');
                if (header) {
                    header.addEventListener('sh-logout-click', () => {
                        header.removeAttribute('isLoggedIn');
                    });
                    header.addEventListener('sh-login-click', () => {
                        header.setAttribute('isLoggedIn', '');
                    });
                }
            })();
        </script>
    `,
};

// Logged Out State
export const LoggedOut: Story = {
    args: {
        userName: 'Guest',
        notificationCount: 0,
        theme: 'dark',
        isLoggedIn: false,
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; min-height: 100vh; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-header
                id="header-loggedout"
                userName="${args.userName}"
                notificationCount="${args.notificationCount}"
                theme="${args.theme}"
                ${args.isLoggedIn ? 'isLoggedIn' : ''}
                data-theme="${args.theme}"
            ></sh-header>
            <div style="padding: 6rem 2rem 2rem 2rem;">
                <h2>Logged Out State</h2>
                <p>When isLoggedIn=false, the header shows "Login" button. Click it to log in!</p>
            </div>
        </div>
        <script>
            (function() {
                const header = document.getElementById('header-loggedout');
                if (header) {
                    header.addEventListener('sh-logout-click', () => {
                        header.removeAttribute('isLoggedIn');
                    });
                    header.addEventListener('sh-login-click', () => {
                        header.setAttribute('isLoggedIn', '');
                        header.setAttribute('userName', 'Sandrine Cipolla');
                    });
                }
            })();
        </script>
    `,
};

// With Many Notifications
export const ManyNotifications: Story = {
    args: {
        userName: 'John Doe',
        notificationCount: 42,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; min-height: 100vh; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-header
                userName="${args.userName}"
                notificationCount="${args.notificationCount}"
                theme="${args.theme}"
                ${args.isLoggedIn ? 'isLoggedIn' : ''}
                data-theme="${args.theme}"
            ></sh-header>
            <div style="padding: 6rem 2rem 2rem 2rem;">
                <h2>42 Notifications</h2>
                <p>The notification badge displays the count.</p>
            </div>
        </div>
    `,
};

// With 99+ Notifications
export const MaxNotifications: Story = {
    args: {
        userName: 'Jane Smith',
        notificationCount: 150,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; min-height: 100vh; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-header
                userName="${args.userName}"
                notificationCount="${args.notificationCount}"
                theme="${args.theme}"
                ${args.isLoggedIn ? 'isLoggedIn' : ''}
                data-theme="${args.theme}"
            ></sh-header>
            <div style="padding: 6rem 2rem 2rem 2rem;">
                <h2>99+ Notifications</h2>
                <p>When count exceeds 99, it displays "99+"</p>
            </div>
        </div>
    `,
};

// No Notifications
export const NoNotifications: Story = {
    args: {
        userName: 'Alex Johnson',
        notificationCount: 0,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; min-height: 100vh; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-header
                userName="${args.userName}"
                notificationCount="${args.notificationCount}"
                theme="${args.theme}"
                ${args.isLoggedIn ? 'isLoggedIn' : ''}
                data-theme="${args.theme}"
            ></sh-header>
            <div style="padding: 6rem 2rem 2rem 2rem;">
                <h2>No Notifications</h2>
                <p>When count is 0, no badge is shown.</p>
            </div>
        </div>
    `,
};

// Light Theme
export const LightTheme: Story = {
    args: {
        userName: 'Sandrine Cipolla',
        notificationCount: 5,
        theme: 'light',
        isLoggedIn: true,
    },
    render: (args) => `
        <div style="background: linear-gradient(to bottom right, #f8fafc, #f0ebff); min-height: 100vh; color: #1e293b;">
            <sh-header
                userName="${args.userName}"
                notificationCount="${args.notificationCount}"
                theme="${args.theme}"
                ${args.isLoggedIn ? 'isLoggedIn' : ''}
                data-theme="${args.theme}"
            ></sh-header>
            <div style="padding: 6rem 2rem 2rem 2rem;">
                <h2>Light Theme Header</h2>
                <p>The header adapts its colors for light mode with proper contrast.</p>
            </div>
        </div>
    `,
};

// Sticky Scroll Demo
export const StickyScrollDemo: Story = {
    args: {
        userName: 'Sandrine Cipolla',
        notificationCount: 3,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; min-height: 100vh; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-header
                userName="${args.userName}"
                notificationCount="${args.notificationCount}"
                theme="${args.theme}"
                ${args.isLoggedIn ? 'isLoggedIn' : ''}
                data-theme="${args.theme}"
            ></sh-header>
            <div style="padding: 6rem 2rem 2rem 2rem;">
                <h2>Sticky Header Demo</h2>
                <p><strong>Scroll down</strong> to see the header stay at the top with glassmorphism effect...</p>

                ${Array.from({length: 20}, (_, i) => `
                    <div style="margin: 2rem 0; padding: 1.5rem; background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; border-radius: 12px; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};">
                        <h3 style="margin-top: 0; color: ${args.theme === 'dark' ? '#a78bfa' : '#7c3aed'};">Section ${i + 1}</h3>
                        <p>This is content section ${i + 1}. Notice how the header remains visible as you scroll.</p>
                        <p>The glassmorphism effect creates a subtle blur over the content beneath it.</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `,
};

// Responsive Demo
export const ResponsiveDemo: Story = {
    args: {
        userName: 'Sandrine Cipolla',
        notificationCount: 5,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; min-height: 100vh; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-header
                userName="${args.userName}"
                notificationCount="${args.notificationCount}"
                theme="${args.theme}"
                ${args.isLoggedIn ? 'isLoggedIn' : ''}
                data-theme="${args.theme}"
            ></sh-header>
            <div style="padding: 6rem 2rem 2rem 2rem;">
                <h2 style="color: ${args.theme === 'dark' ? '#a78bfa' : '#7c3aed'};">Responsive Header</h2>
                <p><strong>Resize the browser window</strong> to see responsive behavior:</p>
                <div style="background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; padding: 1.5rem; border-radius: 12px; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; margin-top: 1rem; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
                    <ul style="line-height: 2; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
                        <li><strong>Mobile (&lt;640px):</strong> User name hidden, "Logout" text hidden (icon only), smaller gaps</li>
                        <li><strong>Desktop (≥640px):</strong> Full user name shown, "Logout" text visible, larger gaps</li>
                        <li><strong>Notifications:</strong> Badge size scales (16px mobile → 20px desktop)</li>
                        <li><strong>Spacing:</strong> Padding and gaps adjust automatically</li>
                    </ul>
                </div>
                <div style="margin-top: 2rem; padding: 1rem; background: ${args.theme === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(124, 58, 237, 0.15)'}; border-left: 4px solid ${args.theme === 'dark' ? '#8b5cf6' : '#7c3aed'}; border-radius: 4px; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
                    <p style="margin: 0; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};"><strong>💡 Tip:</strong> Open the browser dev tools and use responsive mode to test different screen sizes.</p>
                </div>
            </div>
        </div>
    `,
};

// With Event Listeners
export const WithEventListeners: Story = {
    args: {
        userName: 'Interactive User',
        notificationCount: 7,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; min-height: 100vh; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-header
                userName="${args.userName}"
                notificationCount="${args.notificationCount}"
                theme="${args.theme}"
                ${args.isLoggedIn ? 'isLoggedIn' : ''}
                data-theme="${args.theme}"
                id="interactive-header"
            ></sh-header>
            <div style="padding: 6rem 2rem 2rem 2rem;">
                <h2 style="color: ${args.theme === 'dark' ? '#a78bfa' : '#7c3aed'};">Interactive Event Demo</h2>
                <p>Click on the header buttons to see the events being fired:</p>
                <div id="event-log" style="background: ${args.theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; padding: 1rem; border-radius: 8px; font-family: 'Courier New', monospace; min-height: 300px; border: 1px solid ${args.theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; max-height: 400px; overflow-y: auto;">
                    <p style="color: ${args.theme === 'dark' ? '#9ca3af' : '#6b7280'}; margin: 0;">👆 Click on header buttons to see events...</p>
                </div>
            </div>
        </div>
        <script>
            (function() {
                const header = document.getElementById('interactive-header');
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

                    header.addEventListener('sh-login-click', (e) => {
                        const p = document.createElement('p');
                        p.style.cssText = 'color: #34d399; margin: 0.5rem 0; padding: 0.5rem; background: rgba(52, 211, 153, 0.1); border-radius: 4px;';
                        p.textContent = '🔓 sh-login-click | ' + new Date().toLocaleTimeString();
                        log.insertBefore(p, log.children[1] || log.firstChild);
                    });

                    header.addEventListener('sh-logout-click', (e) => {
                        const p = document.createElement('p');
                        p.style.cssText = 'color: #f87171; margin: 0.5rem 0; padding: 0.5rem; background: rgba(248, 113, 113, 0.1); border-radius: 4px;';
                        p.textContent = '👤 sh-logout-click | user: ' + e.detail.userName + ' | ' + new Date().toLocaleTimeString();
                        log.insertBefore(p, log.children[1] || log.firstChild);
                    });
                }
            })();
        </script>
    `,
};

// Playground
export const Playground: Story = {
    args: {
        userName: 'Sandrine Cipolla',
        notificationCount: 3,
        theme: 'dark',
        isLoggedIn: true,
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; min-height: 100vh; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-header
                userName="${args.userName}"
                notificationCount="${args.notificationCount}"
                theme="${args.theme}"
                ${args.isLoggedIn ? 'isLoggedIn' : ''}
                data-theme="${args.theme}"
            ></sh-header>
            <div style="padding: 6rem 2rem 2rem 2rem;">
                <h2>Playground</h2>
                <p>Use the controls below to customize the header properties.</p>
            </div>
        </div>
    `,
};
