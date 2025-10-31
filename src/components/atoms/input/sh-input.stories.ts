import type {Meta, StoryObj} from "@storybook/web-components"
import { expect, userEvent } from '@storybook/test';
import "./sh-input.ts"

const meta = {
    title: "Components/Atoms/Input",
    component: "sh-input",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Composant Input StockHub avec design tokens et support du thème sombre par défaut.",
            },
        },
    },
    argTypes: {
        type: {
            control: "select",
            options: ["text", "number", "email", "password", "tel"],
            description: "Type de l'input",
        },
        placeholder: {
            control: "text",
            description: "Texte de placeholder",
        },
        value: {
            control: "text",
            description: "Valeur de l'input",
        },
        error: {
            control: "boolean",
            description: "État d'erreur",
        },
        errorMessage: {
            control: "text",
            description: "Message d'erreur personnalisé",
        },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
            description: "Taille de l'input",
        },
        hideArrows: {
            control: "boolean",
            description: "Masquer les flèches pour les inputs de type 'number'",
        },
        disabled: {
            control: "boolean",
            description: "État désactivé",
        },
        required: {
            control: "boolean",
            description: "Champ requis",
        },
        name: {
            control: "text",
            description: "Nom de l'input pour les formulaires",
        },
        theme: {
            control: "select",
            options: ["light", "dark"],
            description: "Thème de l'input (light ou dark)",
        },
    },
} satisfies Meta

export default meta
type Story = StoryObj

// Story par défaut
export const Default: Story = {
    args: {
        type: "text",
        placeholder: "Entrez du texte...",
        size: "medium",
        error: false,
        hideArrows: false,
        disabled: false,
        required: false,
        name: "default-input",
        theme: "dark",
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 200px; display: flex; align-items: center; justify-content: center; color: ${args.theme === 'dark' ? '#ffffff' : '#1e293b'};">
            <sh-input
                type="${args.type}"
                placeholder="${args.placeholder}"
                size="${args.size}"
                ?error="${args.error}"
                error-message="${args.errorMessage || ''}"
                ?hide-arrows="${args.hideArrows}"
                ?disabled="${args.disabled}"
                ?required="${args.required}"
                name="${args.name}"
                data-theme="${args.theme}"
            ></sh-input>
        </div>
    `,
}

// Toutes les tailles
export const Sizes: Story = {
    render: () => `
        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg); padding: var(--spacing-lg);">
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Small</label>
                <sh-input size="small" placeholder="Small input" value="Small"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Medium (défaut)</label>
                <sh-input size="medium" placeholder="Medium input" value="Medium"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Large</label>
                <sh-input size="large" placeholder="Large input" value="Large"></sh-input>
            </div>
        </div>
    `,
}

// Types d'inputs
export const Types: Story = {
    render: () => `
        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg); padding: var(--spacing-lg); max-width: 400px;">
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Texte</label>
                <sh-input type="text" placeholder="Nom du produit" name="product-name"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Nombre</label>
                <sh-input type="number" placeholder="Quantité" hide-arrows name="quantity"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Email</label>
                <sh-input type="email" placeholder="contact@stockhub.com" name="email"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Mot de passe</label>
                <sh-input type="password" placeholder="••••••••" name="password"></sh-input>
            </div>
        </div>
    `,
}

// États
export const States: Story = {
    render: () => `
        <div style="display: flex; flex-direction: column; gap: var(--spacing-lg); padding: var(--spacing-lg); max-width: 400px;">
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Normal</label>
                <sh-input placeholder="État normal" value="Texte normal"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Avec erreur</label>
                <sh-input placeholder="Champ requis" error error-message="Ce champ est obligatoire"></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Désactivé</label>
                <sh-input placeholder="Champ désactivé" value="Non modifiable" disabled></sh-input>
            </div>
            <div>
                <label style="display: block; margin-bottom: var(--spacing-xs); color: var(--color-text-secondary); font-size: var(--font-fontSize-sm);">Requis</label>
                <sh-input placeholder="Champ requis" required></sh-input>
            </div>
        </div>
    `,
}

// // Cas d'usage StockHub
// export const StockHubUseCases: Story = {
//     render: () => `
//         <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-xl); padding: var(--spacing-lg);">
//             <div style="background: var(--color-surface-secondary); padding: var(--spacing-lg); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border-subtle);">
//                 <h3 style="margin: 0 0 var(--spacing-md) 0; color: var(--color-text-primary); font-size: var(--font-fontSize-lg);">Ajout Produit</h3>
//                 <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
//                     <sh-input type="text" placeholder="Nom du produit" name="product-name" required></sh-input>
//                     <sh-input type="text" placeholder="SKU" name="sku" size="small"></sh-input>
//                     <sh-input type="number" placeholder="Quantité" name="quantity" hide-arrows></sh-input>
//                     <sh-input type="number" placeholder="Prix unitaire (€)" name="price" hide-arrows></sh-input>
//                 </div>
//             </div>
//
//             <div style="background: var(--color-surface-secondary); padding: var(--spacing-lg); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border-subtle);">
//                 <h3 style="margin: 0 0 var(--spacing-md) 0; color: var(--color-text-primary); font-size: var(--font-fontSize-lg);">Recherche</h3>
//                 <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
//                     <sh-input type="text" placeholder="Rechercher un produit..." size="large" name="search"></sh-input>
//                     <sh-input type="text" placeholder="Filtrer par catégorie" name="category"></sh-input>
//                 </div>
//             </div>
//
//             <div style="background: var(--color-surface-secondary); padding: var(--spacing-lg); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border-subtle);">
//                 <h3 style="margin: 0 0 var(--spacing-md) 0; color: var(--color-text-primary); font-size: var(--font-fontSize-lg);">Configuration</h3>
//                 <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
//                     <sh-input type="number" placeholder="Stock minimum" name="min-stock" size="small" hide-arrows></sh-input>
//                     <sh-input type="text" placeholder="Emplacement" name="location"></sh-input>
//                     <sh-input type="email" placeholder="Email de notification" name="notification-email"></sh-input>
//                 </div>
//             </div>
//         </div>
//     `,
// }

/**
 * Test d'interaction : teste la saisie de texte et les événements.
 * Vérifie sh-input-change, sh-input-focus et sh-input-blur.
 */
export const InteractionTest: Story = {
    args: {
        placeholder: 'Entrez un nom de produit...',
        theme: 'dark',
    },
    parameters: {
        docs: {
            description: {
                story: "Teste la saisie de texte et vérifie que les événements sh-input-change, sh-input-focus et sh-input-blur sont émis correctement. Voir l'onglet 'Interactions'."
            }
        }
    },
    render: (args) => `
        <div style="background: ${args.theme === 'dark' ? 'linear-gradient(to bottom right, #0f172a, #1e1b4b)' : 'linear-gradient(to bottom right, #f8fafc, #f0ebff)'}; padding: 2rem; min-height: 250px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
            <sh-input
                type="text"
                placeholder="${args.placeholder}"
                name="test-input"
                data-theme="${args.theme}"
            ></sh-input>
            <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
                ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            // 1. Sélectionner le custom element
            const shInput = canvasElement.querySelector('sh-input') as HTMLElement;
            await expect(shInput).toBeInTheDocument();

            // 2. Accéder à l'input dans le Shadow DOM
            const input = shInput.shadowRoot?.querySelector('input') as HTMLInputElement;
            await expect(input).toBeTruthy();
            await expect(input.value).toBe('');

            // 3. Écouter les événements
            let changeEventCount = 0;
            let focusEventFired = false;
            let blurEventFired = false;
            let lastChangeValue = '';

            shInput.addEventListener('sh-input-change', ((e: CustomEvent) => {
                changeEventCount++;
                lastChangeValue = e.detail.value;
            }) as EventListener);

            shInput.addEventListener('sh-input-focus', (() => {
                focusEventFired = true;
            }) as EventListener);

            shInput.addEventListener('sh-input-blur', (() => {
                blurEventFired = true;
            }) as EventListener);

            // 4. Focus sur l'input (déclenche sh-input-focus)
            await userEvent.click(input);
            await new Promise(resolve => setTimeout(resolve, 50));
            await expect(focusEventFired).toBe(true);

            // 5. Taper du texte (déclenche sh-input-change)
            await userEvent.type(input, 'Acrylic Paint');
            await new Promise(resolve => setTimeout(resolve, 100));

            // 6. Vérifier que les événements ont été émis
            await expect(changeEventCount).toBeGreaterThan(0);
            await expect(lastChangeValue).toBe('Acrylic Paint');
            await expect(input.value).toBe('Acrylic Paint');

            // 7. Blur l'input (déclenche sh-input-blur)
            input.blur();
            await new Promise(resolve => setTimeout(resolve, 50));
            await expect(blurEventFired).toBe(true);

            // Afficher le succès
            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = `✅ Test réussi ! ${changeEventCount} événements sh-input-change, focus et blur détectés.`;
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
 * Test d'interaction : teste la validation email.
 * Vérifie que l'input détecte les emails invalides.
 */
export const InteractionTestEmailValidation: Story = {
    args: {
        theme: 'dark',
    },
    parameters: {
        docs: {
            description: {
                story: "Teste la validation email : saisie d'un email invalide puis valide. Vérifie l'état error et le message d'erreur."
            }
        }
    },
    render: (args) => `
        <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
            <sh-input
                type="email"
                placeholder="email@example.com"
                name="email-input"
                data-theme="${args.theme}"
            ></sh-input>
            <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
                ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            // Sélectionner le custom element
            const shInput = canvasElement.querySelector('sh-input') as any;
            await expect(shInput).toBeInTheDocument();

            // Accéder à l'input dans le Shadow DOM
            const input = shInput.shadowRoot?.querySelector('input') as HTMLInputElement;
            await expect(input).toBeTruthy();

            // Taper un email invalide
            await userEvent.type(input, 'invalid-email');
            await new Promise(resolve => setTimeout(resolve, 100));

            // Appeler la méthode validate() du composant
            const isValid = shInput.validate();
            await expect(isValid).toBe(false);
            await expect(shInput.error).toBe(true);

            // Vérifier que le message d'erreur est affiché
            const errorMessage = shInput.shadowRoot?.querySelector('.error-message') as HTMLElement;
            await expect(errorMessage).toBeTruthy();
            await expect(errorMessage.textContent).toContain('email invalide');

            // Clear l'input
            shInput.clear();
            await new Promise(resolve => setTimeout(resolve, 50));

            // Taper un email valide
            await userEvent.type(input, 'valid@example.com');
            await new Promise(resolve => setTimeout(resolve, 100));

            // Valider à nouveau
            const isValidNow = shInput.validate();
            await expect(isValidNow).toBe(true);
            await expect(shInput.error).toBe(false);

            // Afficher le succès
            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! Validation email fonctionne (invalide → valide).';
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
 * Test d'interaction : teste l'état disabled.
 * Vérifie qu'un input désactivé ne peut pas être modifié.
 */
export const InteractionTestDisabled: Story = {
    args: {
        theme: 'dark',
    },
    parameters: {
        docs: {
            description: {
                story: "Teste qu'un input disabled ne peut pas recevoir de focus ni être modifié."
            }
        }
    },
    render: (args) => `
        <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 250px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
            <sh-input
                type="text"
                placeholder="Input désactivé"
                value="Non modifiable"
                disabled
                name="disabled-input"
                data-theme="${args.theme}"
            ></sh-input>
            <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
                ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            // Sélectionner le custom element
            const shInput = canvasElement.querySelector('sh-input') as HTMLElement;
            await expect(shInput).toBeInTheDocument();

            // Vérifier que l'attribut disabled est présent
            await expect(shInput.hasAttribute('disabled')).toBe(true);

            // Accéder à l'input dans le Shadow DOM
            const input = shInput.shadowRoot?.querySelector('input') as HTMLInputElement;
            await expect(input).toBeTruthy();

            // Vérifier que l'input interne est disabled
            await expect(input.disabled).toBe(true);

            // Vérifier la valeur initiale
            const initialValue = input.value;
            await expect(initialValue).toBe('Non modifiable');

            // Tenter de modifier (ne devrait rien faire)
            // userEvent ne peut pas interagir avec un élément disabled
            // On vérifie juste que l'état disabled persiste
            await expect(input.disabled).toBe(true);
            await expect(input.value).toBe(initialValue);

            // Afficher le succès
            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! Input disabled fonctionne correctement.';
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
 * Test d'interaction : teste l'effacement automatique de l'erreur.
 * Vérifie que l'erreur disparaît quand l'utilisateur tape.
 */
export const InteractionTestErrorClearing: Story = {
    args: {
        theme: 'dark',
    },
    parameters: {
        docs: {
            description: {
                story: "Teste que l'erreur se clear automatiquement quand l'utilisateur tape du texte dans l'input."
            }
        }
    },
    render: (args) => `
        <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
            <sh-input
                type="text"
                placeholder="Champ requis"
                name="error-input"
                error
                error-message="Ce champ est obligatoire"
                data-theme="${args.theme}"
            ></sh-input>
            <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
                ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            // Sélectionner le custom element
            const shInput = canvasElement.querySelector('sh-input') as any;
            await expect(shInput).toBeInTheDocument();

            // Vérifier que l'erreur est présente au départ
            await expect(shInput.error).toBe(true);

            // Vérifier que le message d'erreur est visible
            let errorMessage = shInput.shadowRoot?.querySelector('.error-message') as HTMLElement;
            await expect(errorMessage).toBeTruthy();

            // Accéder à l'input dans le Shadow DOM
            const input = shInput.shadowRoot?.querySelector('input') as HTMLInputElement;
            await expect(input).toBeTruthy();

            // Taper du texte
            await userEvent.type(input, 'Texte valide');
            await new Promise(resolve => setTimeout(resolve, 100));

            // Vérifier que l'erreur a disparu
            await expect(shInput.error).toBe(false);

            // Vérifier que le message d'erreur n'est plus visible
            errorMessage = shInput.shadowRoot?.querySelector('.error-message') as HTMLElement;
            await expect(errorMessage).toBeNull();

            // Afficher le succès
            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! Erreur effacée automatiquement lors de la saisie.';
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
 * Test d'interaction : teste la validation required.
 * Vérifie que les champs requis sont validés correctement.
 */
export const InteractionTestRequired: Story = {
    args: {
        theme: 'dark',
    },
    parameters: {
        docs: {
            description: {
                story: "Teste la validation required : champ vide → erreur, champ rempli → valide."
            }
        }
    },
    render: (args) => `
        <div style="background: linear-gradient(to bottom right, #0f172a, #1e1b4b); padding: 2rem; min-height: 300px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
            <sh-input
                type="text"
                placeholder="Champ requis"
                name="required-input"
                required
                data-theme="${args.theme}"
            ></sh-input>
            <div id="test-result" style="color: #94a3b8; font-size: 14px; font-weight: 500; text-align: center;">
                ⏳ Test en cours... (voir l'onglet "Interactions" en bas)
            </div>
        </div>
    `,
    play: async ({ canvasElement }) => {
        const resultDiv = canvasElement.querySelector('#test-result') as HTMLElement;

        try {
            // Sélectionner le custom element
            const shInput = canvasElement.querySelector('sh-input') as any;
            await expect(shInput).toBeInTheDocument();

            // Vérifier que required est true
            await expect(shInput.required).toBe(true);

            // Valider avec champ vide
            const isValidEmpty = shInput.validate();
            await expect(isValidEmpty).toBe(false);
            await expect(shInput.error).toBe(true);

            // Vérifier le message d'erreur
            let errorMessage = shInput.shadowRoot?.querySelector('.error-message') as HTMLElement;
            await expect(errorMessage).toBeTruthy();
            await expect(errorMessage.textContent).toContain('requis');

            // Accéder à l'input dans le Shadow DOM
            const input = shInput.shadowRoot?.querySelector('input') as HTMLInputElement;
            await expect(input).toBeTruthy();

            // Taper du texte
            await userEvent.type(input, 'Produit XYZ');
            await new Promise(resolve => setTimeout(resolve, 100));

            // Valider à nouveau
            const isValidFilled = shInput.validate();
            await expect(isValidFilled).toBe(true);
            await expect(shInput.error).toBe(false);

            // Vérifier que le message d'erreur a disparu
            errorMessage = shInput.shadowRoot?.querySelector('.error-message') as HTMLElement;
            await expect(errorMessage).toBeNull();

            // Afficher le succès
            if (resultDiv) {
                resultDiv.style.color = '#10b981';
                resultDiv.innerHTML = '✅ Test réussi ! Validation required fonctionne (vide → erreur, rempli → valide).';
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
