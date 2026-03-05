import type {Meta, StoryObj} from '@storybook/web-components-vite';
import { expect, userEvent } from 'storybook/test';
import './sh-quantity-input.ts';

const meta: Meta = {
    title: 'Components/Molecules/QuantityInput',
    component: 'sh-quantity-input',
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'text', description: 'Valeur initiale de la quantité' },
        dirty: { control: 'boolean', description: 'État modifié (affiche une indication visuelle)' },
        hideArrows: { control: 'boolean', description: 'Masquer les flèches de navigation' },
        theme: {
            control: 'select',
            options: ['light', 'dark'],
            description: 'Thème du composant (light ou dark)',
        },
    },
};

export default meta;
type Story = StoryObj;

// Default
export const Default: Story = {
    args: {
        value: '10',
        dirty: false,
        hideArrows: false,
        theme: 'dark',
    },
    render: (args) => `
        <sh-quantity-input value="${args.value}" ${args.dirty ? 'dirty' : ''} ${args.hideArrows ? 'hideArrows' : ''} data-theme="${args.theme}"></sh-quantity-input>
    `,
};

// Different Values
export const DifferentValues: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: center; padding: 2rem;">
                <div style="text-align: center;">
                    <p style="margin-bottom: 0.5rem; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Quantité: 0</p>
                    <sh-quantity-input value="0" data-theme="${args.theme}"></sh-quantity-input>
                </div>
                <div style="text-align: center;">
                    <p style="margin-bottom: 0.5rem; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Quantité: 5</p>
                    <sh-quantity-input value="5" data-theme="${args.theme}"></sh-quantity-input>
                </div>
                <div style="text-align: center;">
                    <p style="margin-bottom: 0.5rem; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">Quantité: 100</p>
                    <sh-quantity-input value="100" data-theme="${args.theme}"></sh-quantity-input>
                </div>
        </div>
    `,
};

// Dirty State
export const DirtyState: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="padding: 2rem;">
            <h3 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; text-align: center; margin-bottom: 1rem;">Dirty State Indicator</h3>
            <p style="color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'}; text-align: center; max-width: 600px; margin: 0 auto 2rem;">
                L'attribut <code style="background: ${args.theme === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)'}; padding: 2px 6px; border-radius: 4px;">dirty</code> indique qu'une valeur a été modifiée par l'utilisateur.
                Cela affiche une icône "sync" pour signaler que les changements n'ont pas encore été sauvegardés.
            </p>
            <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: center;">
                <div style="text-align: center;">
                    <p style="margin-bottom: 0.5rem; color: ${args.theme === 'dark' ? '#cbd5e1' : '#64748b'};">État Normal (sauvegardé)</p>
                    <sh-quantity-input value="10" data-theme="${args.theme}"></sh-quantity-input>
                </div>
                <div style="text-align: center;">
                    <p style="margin-bottom: 0.5rem; color: ${args.theme === 'dark' ? '#fbbf24' : '#f59e0b'}; font-weight: 500;">État "Dirty" (modifié, non sauvegardé) 🔄</p>
                    <sh-quantity-input value="15" dirty data-theme="${args.theme}"></sh-quantity-input>
                    <p style="margin-top: 0.5rem; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'};">L'icône sync indique des changements en attente</p>
                </div>
            </div>
        </div>
    `,
};

// Without Arrows
export const WithoutArrows: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <sh-quantity-input value="10" hideArrows data-theme="${args.theme}"></sh-quantity-input>
    `,
};

// In Context (Product List)
export const InContext: Story = {
    args: {
        theme: 'dark',
    },
    render: (args) => `
        <div style="padding: 2rem;">
            <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px; margin: 0 auto;">
                <h3 style="color: ${args.theme === 'dark' ? '#f1f5f9' : '#1e293b'}; margin: 0 0 1rem 0;">Produits en stock</h3>

                <!-- Product 1 -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 8px; border: 1px solid ${args.theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.2)'};">
                    <div>
                        <h4 style="margin: 0; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">Acrylic Paint</h4>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'};">REF-001</p>
                    </div>
                    <sh-quantity-input value="150" data-theme="${args.theme}"></sh-quantity-input>
                </div>

                <!-- Product 2 -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 8px; border: 1px solid ${args.theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.2)'};">
                    <div>
                        <h4 style="margin: 0; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">Matte Varnish</h4>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'};">REF-002</p>
                    </div>
                    <sh-quantity-input value="8" dirty data-theme="${args.theme}"></sh-quantity-input>
                </div>

                <!-- Product 3 -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: ${args.theme === 'dark' ? '#1e293b' : '#ffffff'}; border-radius: 8px; border: 1px solid ${args.theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.2)'};">
                    <div>
                        <h4 style="margin: 0; color: ${args.theme === 'dark' ? '#f8fafc' : '#1e293b'};">Pro Brushes</h4>
                        <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: ${args.theme === 'dark' ? '#94a3b8' : '#64748b'};">REF-003</p>
                    </div>
                    <sh-quantity-input value="2" data-theme="${args.theme}"></sh-quantity-input>
                </div>
            </div>
        </div>
    `,
};

// Playground
export const Playground: Story = {
    args: {
        value: '10',
        dirty: false,
        hideArrows: false,
        theme: 'dark',
    },
    render: (args) => `
        <sh-quantity-input
            value="${args.value}"
            ${args.dirty ? 'dirty' : ''}
            ${args.hideArrows ? 'hideArrows' : ''}
            data-theme="${args.theme}">
        </sh-quantity-input>
    `,
};

/**
 * Test d'interaction : teste le cycle complet de modification et synchronisation.
 * Vérifie le changement de valeur, l'état dirty, et l'événement sync.
 */
export const InteractionTest: Story = {
    args: {
        value: '10',
        theme: 'dark',
    },
    parameters: {
        docs: {
            description: {
                story: "Teste le cycle complet : modification de la quantité → état dirty → click sur sync → événement émis. Voir l'onglet 'Interactions' pour les détails."
            }
        }
    },
    render: (args) => `
        <div style="padding: 2rem; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
            <sh-quantity-input
                value="${args.value}"
                data-theme="${args.theme}">
            </sh-quantity-input>
            <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
                ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            // 1. Sélectionner le custom element
            const quantityInput = canvasElement.querySelector('sh-quantity-input') as HTMLElement;
            await expect(quantityInput).toBeInTheDocument();

            // 2. Accéder au Shadow DOM
            const shInput = quantityInput.shadowRoot?.querySelector('sh-input') as HTMLElement;
            await expect(shInput).toBeTruthy();

            // 3. Trouver l'input dans le shadow DOM de sh-input
            const input = shInput.shadowRoot?.querySelector('input') as HTMLInputElement;
            await expect(input).toBeTruthy();
            await expect(input.value).toBe('10');

            // 4. Trouver le bouton sync (dans le shadow DOM de quantity-input)
            const syncButton = quantityInput.shadowRoot?.querySelector('.sync-button') as HTMLButtonElement;
            await expect(syncButton).toBeTruthy();

            // 5. Vérifier que le bouton sync est disabled au départ
            await expect(syncButton.disabled).toBe(true);

            // 6. Changer la valeur de l'input
            // Approche directe : changer la valeur et déclencher l'événement custom
            input.value = '25';

            // Déclencher l'événement input-change sur sh-input (ce que sh-quantity-input écoute)
            shInput.dispatchEvent(new CustomEvent('input-change', {
                detail: '25',
                bubbles: true,
                composed: true
            }));

            // 7. Attendre que l'état dirty soit mis à jour
            await new Promise(resolve => setTimeout(resolve, 100));

            // 8. Vérifier que dirty est maintenant true (le bouton sync est enabled)
            await expect(syncButton.disabled).toBe(false);

            // 9. Écouter l'événement sync
            let syncEventFired = false;
            let syncEventValue = '';
            quantityInput.addEventListener('sync', ((e: CustomEvent) => {
                syncEventFired = true;
                syncEventValue = e.detail;
            }) as EventListener);

            // 10. Cliquer sur le bouton sync
            await userEvent.click(syncButton);

            // 11. Attendre un peu pour que l'événement soit traité
            await new Promise(resolve => setTimeout(resolve, 100));

            // 12. Vérifier que l'événement sync a été émis avec la bonne valeur
            await expect(syncEventFired).toBe(true);
            await expect(syncEventValue).toBe('25');

            // 13. Vérifier que le bouton sync est redevenu disabled (dirty = false)
            await expect(syncButton.disabled).toBe(true);

            // Afficher le succès
            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! Valeur changée (10→25), événement sync émis, état dirty réinitialisé.';
            }
        } catch (error) {
            // Afficher l'erreur
            if (resultDiv) {
                resultDiv.style.color = '#ef4444';
                resultDiv.innerHTML = `❌ Test échoué : ${error}`;
            }
            throw error;
        }
    },
};

/**
 * Test d'interaction : vérifie que le bouton sync est disabled sans modification.
 */
export const InteractionTestSyncDisabled: Story = {
    args: {
        value: '10',
        theme: 'dark',
    },
    parameters: {
        docs: {
            description: {
                story: "Vérifie que le bouton sync reste disabled quand aucune modification n'a été faite (dirty = false)."
            }
        }
    },
    render: (args) => `
        <div style="padding: 2rem; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
            <sh-quantity-input
                value="${args.value}"
                data-theme="${args.theme}">
            </sh-quantity-input>
            <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
                ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            // Sélectionner le custom element
            const quantityInput = canvasElement.querySelector('sh-quantity-input') as HTMLElement;
            await expect(quantityInput).toBeInTheDocument();

            // Vérifier que l'attribut dirty n'est pas présent
            await expect(quantityInput.hasAttribute('dirty')).toBe(false);

            // Accéder au bouton sync dans le Shadow DOM
            const syncButton = quantityInput.shadowRoot?.querySelector('.sync-button') as HTMLButtonElement;
            await expect(syncButton).toBeTruthy();

            // Vérifier que le bouton sync est disabled
            await expect(syncButton.disabled).toBe(true);

            // Afficher le succès
            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! Le bouton sync est bien disabled sans modification.';
            }
        } catch (error) {
            // Afficher l'erreur
            if (resultDiv) {
                resultDiv.style.color = '#ef4444';
                resultDiv.innerHTML = `❌ Test échoué : ${error}`;
            }
            throw error;
        }
    },
};

/**
 * Test d'interaction : vérifie le comportement avec l'attribut dirty préexistant.
 */
export const InteractionTestDirtyState: Story = {
    args: {
        value: '15',
        dirty: true,
        theme: 'dark',
    },
    parameters: {
        docs: {
            description: {
                story: "Teste qu'un composant avec dirty=true au départ a le bouton sync enabled et peut être synchronisé."
            }
        }
    },
    render: (args) => `
        <div style="padding: 2rem; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
            <sh-quantity-input
                value="${args.value}"
                ${args.dirty ? 'dirty' : ''}
                data-theme="${args.theme}">
            </sh-quantity-input>
            <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
                ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            // Sélectionner le custom element
            const quantityInput = canvasElement.querySelector('sh-quantity-input') as HTMLElement;
            await expect(quantityInput).toBeInTheDocument();

            // Vérifier que l'attribut dirty est présent
            await expect(quantityInput.hasAttribute('dirty')).toBe(true);

            // Accéder au bouton sync dans le Shadow DOM
            const syncButton = quantityInput.shadowRoot?.querySelector('.sync-button') as HTMLButtonElement;
            await expect(syncButton).toBeTruthy();

            // Vérifier que le bouton sync est enabled (car dirty = true)
            await expect(syncButton.disabled).toBe(false);

            // Écouter l'événement sync
            let syncEventFired = false;
            quantityInput.addEventListener('sync', (() => {
                syncEventFired = true;
            }) as EventListener);

            // Cliquer sur le bouton sync
            await userEvent.click(syncButton);

            // Attendre que l'événement soit traité
            await new Promise(resolve => setTimeout(resolve, 100));

            // Vérifier que l'événement sync a été émis
            await expect(syncEventFired).toBe(true);

            // Vérifier que le bouton sync est redevenu disabled
            await expect(syncButton.disabled).toBe(true);

            // Afficher le succès
            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! État dirty détecté, sync effectué, dirty réinitialisé.';
            }
        } catch (error) {
            // Afficher l'erreur
            if (resultDiv) {
                resultDiv.style.color = '#ef4444';
                resultDiv.innerHTML = `❌ Test échoué : ${error}`;
            }
            throw error;
        }
    },
};
