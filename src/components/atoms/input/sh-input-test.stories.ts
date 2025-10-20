import type {Meta, StoryObj} from "@storybook/web-components"
import "./sh-input.ts"

const meta = {
    title: "Components/Atoms/Input/Test",
    component: "sh-input",
} satisfies Meta

export default meta
type Story = StoryObj

export const TestSizes: Story = {
    render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px; padding: 20px;">
      <div>
        <p style="color: white; margin-bottom: 8px;">Small (28px)</p>
        <sh-input size="small" placeholder="Small input" value="28px height"></sh-input>
      </div>
      <div>
        <p style="color: white; margin-bottom: 8px;">Medium (40px)</p>
        <sh-input size="medium" placeholder="Medium input" value="40px height"></sh-input>
      </div>
      <div>
        <p style="color: white; margin-bottom: 8px;">Large (56px)</p>
        <sh-input size="large" placeholder="Large input" value="56px height"></sh-input>
      </div>
    </div>
  `,
}