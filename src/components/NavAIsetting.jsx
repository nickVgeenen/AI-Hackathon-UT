import CollapsibleNav from '../components/CollapsibleNav';

export default function AssistantSettings() {
  return (
    <div className="page">
      <CollapsibleNav title="About AI-Assistant Settings" defaultOpen={true}>
        <p>Here you can configure your AI-assistant settings to tailor its behavior.</p>
      </CollapsibleNav>
    </div>
  );
}
    