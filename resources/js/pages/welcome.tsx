import { Head, Link, usePage } from '@inertiajs/react';
import { useState, type ComponentProps, type ReactNode } from 'react';
import { dashboard } from '@/routes';
import { LoginDialog } from '@/components/auth/login-dialog';
import { RegisterDialog } from '@/components/auth/register-dialog';
import * as Dialog from '@radix-ui/react-dialog';
import {
    Activity,
    Atom,
    BookOpen,
    Bot,
    Brain,
    Code2,
    Cpu,
    Drum,
    Dumbbell,
    Flower2,
    Gauge,
    GitBranch,
    HeartPulse,
    Lightbulb,
    ShieldCheck,
    Sparkles,
    Stethoscope,
    Waves,
    Wrench,
    type LucideIcon,
} from 'lucide-react';

type Tone =
    | 'purple'
    | 'rose'
    | 'cyan'
    | 'amber'
    | 'blue'
    | 'red'
    | 'emerald'
    | 'orange'
    | 'indigo';

type NodeIconKey =
    | 'branch'
    | 'flower'
    | 'brain'
    | 'shield'
    | 'cpu'
    | 'wrench'
    | 'stethoscope'
    | 'heart'
    | 'waves'
    | 'drum'
    | 'dumbbell'
    | 'gauge'
    | 'atom'
    | 'code'
    | 'bot'
    | 'activity'
    | 'book'
    | 'lightbulb';

type NodeCardProps = {
    label: string;
    branches: number;
    tone: Tone;
    icon: ReactNode;
    selected?: boolean;
    onClick?: () => void;
};

type NodeData = {
    id: string;
    label: string;
    description: string;
    branches: number;
    tone: Tone;
    icon: ReactNode;
    iconKey: NodeIconKey;
};

const defaultNodes: NodeData[] = [
    { id: 'you', label: 'YOU', description: 'Your connected interests and learning paths.', branches: 9, tone: 'purple', icon: <SparklesIcon className="h-4 w-4" />, iconKey: 'activity' },
    { id: 'neuroscience', label: 'Neuroscience', description: 'Brain systems, cognition, behavior and neural research.', branches: 2, tone: 'rose', icon: <BrainCircuitIcon className="h-4 w-4" />, iconKey: 'brain' },
    { id: 'nirvana', label: 'Nirvana', description: 'Mindfulness, music and personal philosophy.', branches: 2, tone: 'cyan', icon: <SparklesIcon className="h-4 w-4" />, iconKey: 'flower' },
    { id: 'mechanical', label: 'Mechanical E...', description: 'Mechanical engineering, tools, machines and design.', branches: 2, tone: 'amber', icon: <CpuIcon className="h-4 w-4" />, iconKey: 'wrench' },
    { id: 'hacking', label: 'Hacking', description: 'Security research, networks, systems and responsible testing.', branches: 3, tone: 'purple', icon: <ShieldIcon className="h-4 w-4" />, iconKey: 'shield' },
    { id: 'sports', label: 'Sports', description: 'Training, competition and athletic performance.', branches: 2, tone: 'purple', icon: <OrbitIcon className="h-4 w-4" />, iconKey: 'dumbbell' },
    { id: 'robotics', label: 'Robotics', description: 'Robotics, automation and intelligent machines.', branches: 2, tone: 'blue', icon: <RocketIcon className="h-4 w-4" />, iconKey: 'cpu' },
    { id: 'drums', label: 'Drums', description: 'Rhythm, percussion and musical practice.', branches: 2, tone: 'amber', icon: <DatabaseIcon className="h-4 w-4" />, iconKey: 'drum' },
    { id: 'motorsports', label: 'Motorsports', description: 'Performance, racing and vehicle engineering.', branches: 2, tone: 'red', icon: <OrbitIcon className="h-4 w-4" />, iconKey: 'gauge' },
    { id: 'doctor', label: 'Doctor', description: 'Medicine, health science and patient care.', branches: 2, tone: 'emerald', icon: <SparklesIcon className="h-4 w-4" />, iconKey: 'stethoscope' },
];

const iconOptions: { key: NodeIconKey; label: string; Icon: LucideIcon }[] = [
    { key: 'branch', label: 'Branch', Icon: GitBranch },
    { key: 'flower', label: 'Flower', Icon: Flower2 },
    { key: 'brain', label: 'Brain', Icon: Brain },
    { key: 'shield', label: 'Shield', Icon: ShieldCheck },
    { key: 'cpu', label: 'Chip', Icon: Cpu },
    { key: 'wrench', label: 'Wrench', Icon: Wrench },
    { key: 'stethoscope', label: 'Stethoscope', Icon: Stethoscope },
    { key: 'heart', label: 'Heart', Icon: HeartPulse },
    { key: 'waves', label: 'Waves', Icon: Waves },
    { key: 'drum', label: 'Drum', Icon: Drum },
    { key: 'dumbbell', label: 'Dumbbell', Icon: Dumbbell },
    { key: 'gauge', label: 'Gauge', Icon: Gauge },
    { key: 'atom', label: 'Atom', Icon: Atom },
    { key: 'code', label: 'Code', Icon: Code2 },
    { key: 'bot', label: 'Robot', Icon: Bot },
    { key: 'activity', label: 'Activity', Icon: Activity },
    { key: 'book', label: 'Book', Icon: BookOpen },
    { key: 'lightbulb', label: 'Lightbulb', Icon: Lightbulb },
];

const toneOptions: { tone: Tone; color: string; label: string }[] = [
    { tone: 'purple', color: '#8b5cf6', label: 'Purple' },
    { tone: 'blue', color: '#3b82f6', label: 'Blue' },
    { tone: 'emerald', color: '#10b981', label: 'Green' },
    { tone: 'orange', color: '#f97316', label: 'Orange' },
    { tone: 'rose', color: '#ec4899', label: 'Pink' },
    { tone: 'indigo', color: '#7c5ce7', label: 'Violet' },
    { tone: 'red', color: '#ef4444', label: 'Red' },
    { tone: 'amber', color: '#d9901a', label: 'Amber' },
    { tone: 'cyan', color: '#3b82a0', label: 'Teal' },
];

export default function Welcome() {
    const { auth } = usePage<{ auth: { user?: unknown } }>().props;
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [nodes, setNodes] = useState<NodeData[]>(defaultNodes);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [panelOpen, setPanelOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [draftLabel, setDraftLabel] = useState('');
    const [draftDescription, setDraftDescription] = useState('');
    const [draftTone, setDraftTone] = useState<Tone>('purple');
    const [draftIcon, setDraftIcon] = useState<ReactNode>(<SparklesIcon className="h-4 w-4" />);
    const [draftIconKey, setDraftIconKey] = useState<NodeIconKey>('activity');

    const nodeAnchors: Record<string, { left: string; top: string }> = {
        you: { left: '54%', top: '42%' },
        neuroscience: { left: '8%', top: '37%' },
        nirvana: { left: '18%', top: '61%' },
        mechanical: { left: '16%', top: '81.5%' },
        hacking: { left: '43%', top: '11.8%' },
        sports: { left: '62%', top: '34.7%' },
        robotics: { left: '77%', top: '37%' },
        drums: { left: '43%', top: '61%' },
        motorsports: { left: '68%', top: '61%' },
        doctor: { left: '69%', top: '81.5%' },
    };

    const centerNode = nodes.find((node) => node.id === 'you') ?? null;
    const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;
    const selectedAnchor = selectedNodeId ? nodeAnchors[selectedNodeId] : undefined;

    const openNode = (id: string) => {
        setSelectedNodeId(id);
        setPanelOpen(true);
        setEditingId(null);
    };

    const handleDeleteNode = () => {
        if (!selectedNode) {
            return;
        }

        setNodes((current) => current.filter((node) => node.id !== selectedNode.id));
        setSelectedNodeId(null);
        setPanelOpen(false);
        setEditingId(null);
    };

    const handleAddNode = () => {
        const nextNode: NodeData = {
            id: `node-${Date.now()}`,
            label: 'New node',
            description: '',
            branches: 1,
            tone: 'purple',
            icon: <SparklesIcon className="h-4 w-4" />,
            iconKey: 'activity',
        };

        setNodes((current) => [...current, nextNode]);
        setSelectedNodeId(nextNode.id);
        setPanelOpen(true);
        setEditingId(null);
    };

    const handleEditNode = () => {
        if (!selectedNode) {
            return;
        }

        setEditingId(selectedNode.id);
        setDraftLabel(selectedNode.label);
        setDraftDescription(selectedNode.description);
        setDraftTone(selectedNode.tone);
        setDraftIcon(selectedNode.icon);
        setDraftIconKey(selectedNode.iconKey);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setDraftLabel('');
        setDraftDescription('');
    };

    const handleSaveEdit = () => {
        if (!selectedNode || !editingId) {
            return;
        }

        setNodes((current) =>
            current.map((node) =>
                node.id === editingId
                    ? {
                          ...node,
                          label: draftLabel.trim() || node.label,
                          description: draftDescription.trim(),
                          tone: draftTone,
                          icon: draftIcon,
                          iconKey: draftIconKey,
                      }
                    : node,
            ),
        );
        setEditingId(null);
        setDraftLabel('');
        setDraftDescription('');
    };

    return (
        <>
            <Head title="Northstar" />

            <div className="min-h-screen bg-[#050814] px-3 py-3 text-white">
                <div className="mx-auto flex h-[calc(100vh-24px)] max-w-[1500px] flex-col gap-3">
                    <nav className="flex items-center justify-between rounded-2xl border border-violet-400/15 bg-[#090d1f]/80 px-4 py-3 shadow-[0_0_30px_rgba(124,58,237,0.08)] backdrop-blur-sm">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                                <SparklesIcon className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-semibold tracking-wide text-white">Northstar</span>
                        </Link>
                        <div className="flex items-center gap-2 text-sm">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-lg border border-violet-400/25 bg-violet-500/15 px-3 py-1.5 font-medium text-violet-100 transition hover:bg-violet-500/25"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setLoginOpen(true)}
                                        className="rounded-lg px-3 py-1.5 font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                                    >
                                        Log in
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRegisterOpen(true)}
                                        className="rounded-lg border border-violet-400/25 bg-violet-500/15 px-3 py-1.5 font-medium text-violet-100 transition hover:bg-violet-500/25"
                                    >
                                        Register
                                    </button>
                                </>
                            )}
                        </div>
                    </nav>
                    <LoginDialog
                        open={loginOpen}
                        onOpenChange={setLoginOpen}
                        onSwitchToRegister={() => {
                            setLoginOpen(false);
                            setRegisterOpen(true);
                        }}
                    />
                    <RegisterDialog
                        open={registerOpen}
                        onOpenChange={setRegisterOpen}
                        onSwitchToLogin={() => {
                            setRegisterOpen(false);
                            setLoginOpen(true);
                        }}
                    />
                    <main className="relative min-h-0 flex-1 overflow-hidden rounded-[26px] border border-violet-400/15 bg-[#090d1f]/90 shadow-[0_0_80px_rgba(124,58,237,0.14)]">
                    <div className="absolute inset-0 opacity-90 [background-image:linear-gradient(rgba(168,85,247,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.08)_1px,transparent_1px)] [background-size:36px_36px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.18),_rgba(7,10,20,0.3)_35%,_transparent_60%)]" />

                    <svg
                        className="absolute inset-0 h-full w-full"
                        viewBox="0 0 1200 760"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <ellipse cx="600" cy="380" rx="385" ry="330" stroke="rgba(139,92,246,0.22)" strokeWidth="1.5" strokeDasharray="4 12" />
                        <circle cx="600" cy="380" r="270" stroke="rgba(139,92,246,0.12)" strokeWidth="1.5" />
                        <circle cx="600" cy="380" r="185" stroke="rgba(139,92,246,0.12)" strokeWidth="1.5" />
                        <circle cx="600" cy="380" r="104" stroke="rgba(139,92,246,0.2)" strokeWidth="1.5" strokeDasharray="3 5" />
                        <g stroke="rgba(130,105,220,0.74)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="600" y1="50" x2="905" y2="714" />
                            <line x1="905" y1="714" x2="90" y2="309" />
                            <line x1="90" y1="309" x2="1100" y2="309" />
                            <line x1="1100" y1="309" x2="285" y2="714" />
                            <line x1="285" y1="714" x2="600" y2="50" />
                        </g>

                        <g>
                            <circle cx="600" cy="50" r="13" fill="rgba(124,58,237,0.18)" />
                            <circle cx="600" cy="50" r="7" fill="#8b5cf6" />
                            <circle cx="600" cy="50" r="3" fill="#e9ddff" />
                            <circle cx="1100" cy="300" r="13" fill="rgba(37,99,235,0.2)" />
                            <circle cx="1100" cy="300" r="7" fill="#3b82f6" />
                            <circle cx="1100" cy="300" r="3" fill="#dbeafe" />
                            <circle cx="905" cy="714" r="13" fill="rgba(16,185,129,0.2)" />
                            <circle cx="905" cy="714" r="7" fill="#10b981" />
                            <circle cx="905" cy="714" r="3" fill="#d1fae5" />
                            <circle cx="285" cy="714" r="13" fill="rgba(249,115,22,0.2)" />
                            <circle cx="285" cy="714" r="7" fill="#f97316" />
                            <circle cx="285" cy="714" r="3" fill="#ffedd5" />
                            <circle cx="90" cy="309" r="13" fill="rgba(244,63,94,0.2)" />
                            <circle cx="90" cy="309" r="7" fill="#f43f5e" />
                            <circle cx="90" cy="309" r="3" fill="#ffe4e6" />
                            <circle cx="476" cy="309" r="13" fill="rgba(124,58,237,0.2)" />
                            <circle cx="476" cy="309" r="7" fill="#7c3aed" />
                            <circle cx="721" cy="309" r="13" fill="rgba(139,92,246,0.2)" />
                            <circle cx="721" cy="309" r="7" fill="#8b5cf6" />
                            <circle cx="402" cy="460" r="13" fill="rgba(34,211,238,0.2)" />
                            <circle cx="402" cy="460" r="7" fill="#22d3ee" />
                            <circle cx="792" cy="460" r="13" fill="rgba(239,68,68,0.2)" />
                            <circle cx="792" cy="460" r="7" fill="#ef4444" />
                            <circle cx="600" cy="556" r="13" fill="rgba(245,158,11,0.2)" />
                            <circle cx="600" cy="556" r="7" fill="#f59e0b" />
                        </g>
                    </svg>

                    {centerNode && (
                        <button
                            type="button"
                            aria-label={`Open ${centerNode.label} node`}
                            onClick={() => openNode(centerNode.id)}
                            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 scale-[min(1,calc(100vh/620px))] rounded-full text-center transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
                        >
                            <span className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border border-violet-300/25 bg-[#171525]/95 shadow-[0_0_45px_rgba(124,58,237,0.28)]">
                                <span className="absolute -inset-3 rounded-full border border-violet-400/15" />
                                <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-300">
                                    {centerNode.icon}
                                </span>
                                <span className="text-sm font-bold text-white">{centerNode.label}</span>
                                <span className="mt-0.5 text-[0.7rem] text-slate-400">{centerNode.branches} paths</span>
                            </span>
                        </button>
                    )}

                    <div className="absolute left-[8.5%] top-[37.4%] z-10">
                                    <NodeCard
                                        label={nodes.find((node) => node.id === 'neuroscience')?.label ?? 'Neuroscience'}
                                        branches={nodes.find((node) => node.id === 'neuroscience')?.branches ?? 2}
                                        tone={nodes.find((node) => node.id === 'neuroscience')?.tone ?? 'rose'}
                                        icon={nodes.find((node) => node.id === 'neuroscience')?.icon ?? <BrainCircuitIcon className="h-4 w-4" />}
                                        selected={selectedNodeId === 'neuroscience'}
                                        onClick={() => openNode('neuroscience')}
                                    />
                                </div>
                    <div className="absolute left-[18%] top-[61.3%] z-10">
                                    <NodeCard
                                        label={nodes.find((node) => node.id === 'nirvana')?.label ?? 'Nirvana'}
                                        branches={nodes.find((node) => node.id === 'nirvana')?.branches ?? 2}
                                        tone={nodes.find((node) => node.id === 'nirvana')?.tone ?? 'cyan'}
                                        icon={nodes.find((node) => node.id === 'nirvana')?.icon ?? <SparklesIcon className="h-4 w-4" />}
                                        selected={selectedNodeId === 'nirvana'}
                                        onClick={() => openNode('nirvana')}
                                    />
                                </div>
                    <div className="absolute left-[16%] top-[81.6%] z-10">
                                    <NodeCard
                                        label={nodes.find((node) => node.id === 'mechanical')?.label ?? 'Mechanical E...'}
                                        branches={nodes.find((node) => node.id === 'mechanical')?.branches ?? 2}
                                        tone={nodes.find((node) => node.id === 'mechanical')?.tone ?? 'amber'}
                                        icon={nodes.find((node) => node.id === 'mechanical')?.icon ?? <CpuIcon className="h-4 w-4" />}
                                        selected={selectedNodeId === 'mechanical'}
                                        onClick={() => openNode('mechanical')}
                                    />
                                </div>

                                {panelOpen && selectedNode && selectedAnchor && (
                                    <div
                                        className="absolute z-50 w-[240px] max-w-[calc(100vw-56px)] max-h-[calc(100vh-56px)] overflow-y-auto rounded-[20px] border border-violet-300/40 bg-[#151a2c]/90 p-4 shadow-[0_0_35px_rgba(168,85,247,0.25)] backdrop-blur-md transition-all duration-200 ease-out animate-[fadeIn_0.18s_ease-out]"
                                        style={{
                                            left: `clamp(16px, ${selectedAnchor.left}, calc(100% - 256px))`,
                                            top: `clamp(16px, ${selectedAnchor.top}, calc(100% - 260px))`,
                                        }}
                                    >
                                        <div className="mb-3 flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/15 text-violet-200">
                                                    {selectedNode.icon}
                                                </div>
                                                <div>
                                                    <div className="text-[1.05rem] font-medium text-white">{selectedNode.label}</div>
                                                    <div className="mt-0.5 flex items-center gap-1 text-[0.7rem] text-slate-300/80">
                                                        <GitBranchPlus className="h-3 w-3" />
                                                        <span>{selectedNode.branches} branches</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300"
                                                aria-label="Close panel"
                                                onClick={() => setPanelOpen(false)}
                                            >
                                                <CloseIcon className="h-3.5 w-3.5" />
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            <button
                                                type="button"
                                                className="flex w-full items-center justify-between rounded-xl border border-violet-300/20 bg-violet-500/10 px-3 py-2 text-sm text-violet-100"
                                            >
                                                <span className="inline-flex items-center gap-2">
                                                    <SparklesIcon className="h-3.5 w-3.5" />
                                                    Explore branches
                                                </span>
                                                <ChevronRightIcon className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-slate-200"
                                                onClick={handleAddNode}
                                            >
                                                <span className="inline-flex items-center gap-2">
                                                    <PlusIcon className="h-3.5 w-3.5" />
                                                    Add subnode
                                                </span>
                                            </button>
                                        </div>

                                        <div className="mt-3 flex items-center gap-2">
                                            <button
                                                type="button"
                                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-slate-200"
                                                onClick={handleEditNode}
                                            >
                                                <PencilIcon className="h-3.5 w-3.5" />
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-300/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-100"
                                                onClick={handleDeleteNode}
                                            >
                                                <TrashIcon className="h-3.5 w-3.5" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                    <div className="absolute left-[77.2%] top-[37%] z-10">
                                    <NodeCard
                                        label={nodes.find((node) => node.id === 'robotics')?.label ?? 'Robotics'}
                                        branches={nodes.find((node) => node.id === 'robotics')?.branches ?? 2}
                                        tone={nodes.find((node) => node.id === 'robotics')?.tone ?? 'blue'}
                                        icon={nodes.find((node) => node.id === 'robotics')?.icon ?? <RocketIcon className="h-4 w-4" />}
                                        selected={selectedNodeId === 'robotics'}
                                        onClick={() => openNode('robotics')}
                                    />
                                </div>
                    <div className="absolute left-[43.5%] top-[61.3%] z-10">
                                    <NodeCard
                                        label={nodes.find((node) => node.id === 'drums')?.label ?? 'Drums'}
                                        branches={nodes.find((node) => node.id === 'drums')?.branches ?? 2}
                                        tone={nodes.find((node) => node.id === 'drums')?.tone ?? 'amber'}
                                        icon={nodes.find((node) => node.id === 'drums')?.icon ?? <DatabaseIcon className="h-4 w-4" />}
                                        selected={selectedNodeId === 'drums'}
                                        onClick={() => openNode('drums')}
                                    />
                                </div>
                    <div className="absolute left-[68.4%] top-[61.3%] z-10">
                                    <NodeCard
                                        label={nodes.find((node) => node.id === 'motorsports')?.label ?? 'Motorsports'}
                                        branches={nodes.find((node) => node.id === 'motorsports')?.branches ?? 2}
                                        tone={nodes.find((node) => node.id === 'motorsports')?.tone ?? 'red'}
                                        icon={nodes.find((node) => node.id === 'motorsports')?.icon ?? <OrbitIcon className="h-4 w-4" />}
                                        selected={selectedNodeId === 'motorsports'}
                                        onClick={() => openNode('motorsports')}
                                    />
                                </div>
                    <div className="absolute left-[69.3%] top-[81.6%] z-10">
                                    <NodeCard
                                        label={nodes.find((node) => node.id === 'doctor')?.label ?? 'Doctor'}
                                        branches={nodes.find((node) => node.id === 'doctor')?.branches ?? 2}
                                        tone={nodes.find((node) => node.id === 'doctor')?.tone ?? 'emerald'}
                                        icon={nodes.find((node) => node.id === 'doctor')?.icon ?? <SparklesIcon className="h-4 w-4" />}
                                        selected={selectedNodeId === 'doctor'}
                                        onClick={() => openNode('doctor')}
                                    />
                                </div>

                    <div className="absolute bottom-5 left-4 flex items-center gap-2 rounded-full border border-violet-400/20 bg-[#111827]/70 px-3 py-2 text-xs text-slate-300 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                        Click to explore
                    </div>

                    <div className="absolute bottom-5 right-4 flex items-center gap-2 rounded-full border border-violet-400/20 bg-[#111827]/70 px-3 py-2 text-xs text-slate-300 backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
                        Connected knowledge
                    </div>

                    <div className="absolute left-[43.5%] top-[11.8%] z-10">
                        <NodeCard
                            label={nodes.find((node) => node.id === 'hacking')?.label ?? 'Hacking'}
                            branches={nodes.find((node) => node.id === 'hacking')?.branches ?? 3}
                            tone={nodes.find((node) => node.id === 'hacking')?.tone ?? 'purple'}
                            icon={nodes.find((node) => node.id === 'hacking')?.icon ?? <ShieldIcon className="h-4 w-4" />}
                            selected={selectedNodeId === 'hacking'}
                            onClick={() => openNode('hacking')}
                        />
                    </div>
                    <div className="absolute left-[62.5%] top-[34.7%] z-10">
                        <NodeCard
                            label={nodes.find((node) => node.id === 'sports')?.label ?? 'Sports'}
                            branches={nodes.find((node) => node.id === 'sports')?.branches ?? 2}
                            tone={nodes.find((node) => node.id === 'sports')?.tone ?? 'purple'}
                            icon={nodes.find((node) => node.id === 'sports')?.icon ?? <OrbitIcon className="h-4 w-4" />}
                            selected={selectedNodeId === 'sports'}
                            onClick={() => openNode('sports')}
                        />
                    </div>
                    </main>
                </div>

                <Dialog.Root
                    open={editingId !== null && selectedNode !== null}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) {
                            handleCancelEdit();
                        }
                    }}
                >
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 z-[110] bg-[#0b0910]/65 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                        {selectedNode && (
                            <Dialog.Content className="fixed left-1/2 top-1/2 z-[111] max-h-[calc(100vh-32px)] w-[calc(100%-32px)] max-w-[512px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[22px] border border-white/10 bg-[#201d25] p-7 text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] outline-none sm:p-8">
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                        handleSaveEdit();
                                    }}
                                >
                                    <div className="mb-6 flex items-start justify-between gap-5">
                                        <div>
                                            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">Grow your universe</div>
                                            <Dialog.Title className="text-[22px] font-medium leading-tight text-white">Edit node</Dialog.Title>
                                        </div>
                                        <Dialog.Close asChild>
                                            <button
                                                type="button"
                                                aria-label="Close edit node dialog"
                                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-slate-300 transition hover:bg-white/10 hover:text-white"
                                            >
                                                <CloseIcon className="h-4 w-4" />
                                            </button>
                                        </Dialog.Close>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="block space-y-2">
                                            <span className="text-[11px] font-semibold text-slate-300">Node name</span>
                                            <input
                                                autoFocus
                                                maxLength={40}
                                                value={draftLabel}
                                                onChange={(event) => setDraftLabel(event.target.value)}
                                                className="h-11 w-full rounded-[10px] border border-white/10 bg-[#17151b] px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/70 focus:ring-2 focus:ring-violet-400/15"
                                            />
                                        </label>

                                        <label className="block space-y-2">
                                            <span className="text-[11px] font-semibold text-slate-300">Description</span>
                                            <textarea
                                                maxLength={180}
                                                rows={3}
                                                value={draftDescription}
                                                onChange={(event) => setDraftDescription(event.target.value)}
                                                className="w-full resize-none rounded-[10px] border border-white/10 bg-[#17151b] px-3 py-3 pb-7 text-sm leading-5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/70 focus:ring-2 focus:ring-violet-400/15"
                                            />
                                            <span className="-mt-8 mr-3 block text-right text-[10px] text-slate-500">{draftDescription.length}/180</span>
                                        </label>

                                        <fieldset className="space-y-2">
                                            <legend className="text-[11px] font-semibold text-slate-300">Icon</legend>
                                            <div className="grid grid-cols-9 gap-1.5">
                                                {iconOptions.map(({ key, label, Icon }) => (
                                                    <button
                                                        key={key}
                                                        type="button"
                                                        aria-label={`${label} icon`}
                                                        aria-pressed={draftIconKey === key}
                                                        title={label}
                                                        onClick={() => {
                                                            setDraftIconKey(key);
                                                            setDraftIcon(<Icon className="h-5 w-5" />);
                                                        }}
                                                        className={`flex h-10 w-10 items-center justify-center rounded-[10px] border transition ${draftIconKey === key ? 'border-violet-400 bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/50' : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200'}`}
                                                    >
                                                        <Icon className="h-5 w-5" />
                                                    </button>
                                                ))}
                                            </div>
                                        </fieldset>

                                        <fieldset className="space-y-2">
                                            <legend className="text-[11px] font-semibold text-slate-300">Color</legend>
                                            <div className="flex flex-wrap items-center gap-2.5 py-1">
                                                {toneOptions.map(({ tone, color, label }) => (
                                                    <button
                                                        key={tone}
                                                        type="button"
                                                        aria-label={`${label} color`}
                                                        aria-pressed={draftTone === tone}
                                                        title={label}
                                                        onClick={() => setDraftTone(tone)}
                                                        className={`h-7 w-7 rounded-full border-[3px] transition ${draftTone === tone ? 'border-white ring-2 ring-violet-400/80 ring-offset-2 ring-offset-[#201d25]' : 'border-white/80 hover:scale-110'}`}
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </fieldset>

                                        <div className="flex items-center gap-3 rounded-[12px] border border-violet-200/70 bg-violet-400/[0.08] p-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${toneOptions.find(({ tone }) => tone === draftTone)?.color}30`, color: toneOptions.find(({ tone }) => tone === draftTone)?.color }}>
                                                {draftIcon}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">Preview</div>
                                                <div className="truncate text-sm font-semibold text-slate-100">{draftLabel || 'Untitled node'}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex justify-end gap-2.5">
                                        <Dialog.Close asChild>
                                            <button
                                                type="button"
                                                className="h-11 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
                                            >
                                                Cancel
                                            </button>
                                        </Dialog.Close>
                                        <button
                                            type="submit"
                                            className="h-11 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(124,58,237,0.3)] transition hover:bg-violet-500"
                                        >
                                            Save changes
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Content>
                        )}
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </>
    );
}

function NodeCard({ label, branches, tone, icon, selected = false, onClick }: NodeCardProps) {
    const palettes: Record<Tone, string> = {
        purple: 'from-violet-500/25 to-violet-400/10 text-violet-200 ring-violet-300/30 bg-violet-500/10',
        rose: 'from-rose-500/25 to-rose-400/10 text-rose-200 ring-rose-300/30 bg-rose-500/10',
        cyan: 'from-cyan-500/25 to-cyan-400/10 text-cyan-200 ring-cyan-300/30 bg-cyan-500/10',
        amber: 'from-amber-500/25 to-amber-400/10 text-amber-100 ring-amber-300/30 bg-amber-500/10',
        blue: 'from-blue-500/25 to-blue-400/10 text-blue-200 ring-blue-300/30 bg-blue-500/10',
        red: 'from-red-500/25 to-red-400/10 text-red-200 ring-red-300/30 bg-red-500/10',
        emerald: 'from-emerald-500/25 to-emerald-400/10 text-emerald-200 ring-emerald-300/30 bg-emerald-500/10',
        orange: 'from-orange-500/25 to-orange-400/10 text-orange-200 ring-orange-300/30 bg-orange-500/10',
        indigo: 'from-indigo-500/25 to-indigo-400/10 text-indigo-200 ring-indigo-300/30 bg-indigo-500/10',
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                'relative w-[168px] origin-top-left scale-[min(1,calc(100vh/700px))] overflow-hidden rounded-[16px] border border-white/10 bg-[#1d1b25]/90 px-3 py-2.5 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_24px_rgba(15,23,42,0.35)] backdrop-blur-md transition hover:border-violet-300/30 hover:brightness-110',
                selected ? 'border-violet-300/40 shadow-[0_0_0_1px_rgba(196,181,253,0.35),0_0_30px_rgba(168,85,247,0.24)]' : '',
            ].join(' ')}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_35%)]" />
            <div className="relative flex items-center gap-2.5">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${palettes[tone]} ring-1`}>
                    {icon}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="truncate whitespace-nowrap text-[clamp(11px,0.9vw,13px)] font-semibold text-white">{label}</div>
                    <div className="mt-0.5 whitespace-nowrap text-[clamp(10px,0.78vw,11px)] text-slate-300/70">
                        {branches} branches
                    </div>
                </div>
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-400" />
            </div>
        </button>
    );
}

function GitBranchPlus(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M6 3v11a2 2 0 0 0 2 2h7" />
            <path d="M6 3v12" />
            <path d="M6 3h6" />
            <path d="M18 9h-3" />
            <path d="M18 9v3" />
            <path d="M18 9V6" />
        </svg>
    );
}

function SearchIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="11" cy="11" r="6" />
            <path d="M16 16 21 21" />
        </svg>
    );
}

function SparklesIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 3v3" />
            <path d="M12 18v3" />
            <path d="M4.93 4.93l2.12 2.12" />
            <path d="M16.95 16.95l2.12 2.12" />
            <path d="M3 12h3" />
            <path d="M18 12h3" />
            <path d="M4.93 19.07l2.12-2.12" />
            <path d="M16.95 7.05l2.12-2.12" />
        </svg>
    );
}

function PlusIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </svg>
    );
}

function PencilIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" />
        </svg>
    );
}

function TrashIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
        </svg>
    );
}

function ChevronRightIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

function SunIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m4.93 19.07 1.41-1.41" />
            <path d="m17.66 6.34 1.41-1.41" />
        </svg>
    );
}

function CloseIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}

function BrainCircuitIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M9 5.5A3.5 3.5 0 0 1 12.5 2h.5A3.5 3.5 0 0 1 16.5 5.5V7" />
            <path d="M15 18.5A3.5 3.5 0 0 1 11.5 22h-.5A3.5 3.5 0 0 1 7.5 18.5V17" />
            <path d="M9 7.5A3.5 3.5 0 0 1 5.5 11v.5A3.5 3.5 0 0 1 9 15h.5" />
            <path d="M15 16.5A3.5 3.5 0 0 1 18.5 13v-.5A3.5 3.5 0 0 1 15 9h-.5" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
        </svg>
    );
}

function CpuIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="7" y="7" width="10" height="10" rx="2" />
            <path d="M9 3v4" />
            <path d="M15 3v4" />
            <path d="M9 17v4" />
            <path d="M15 17v4" />
            <path d="M3 9h4" />
            <path d="M3 15h4" />
            <path d="M17 9h4" />
            <path d="M17 15h4" />
        </svg>
    );
}

function ShieldIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 3 5 6v6c0 5 3.4 8.5 7 9 3.6-.5 7-4 7-9V6l-7-3Z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

function RocketIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4 14c0-4.5 3.5-8 8-8s8 3.5 8 8c0 4.5-3.5 8-8 8s-8-3.5-8-8Z" />
            <path d="M12 10v4" />
            <path d="M10 12h4" />
            <path d="M9 17 5 19" />
            <path d="M15 17l4 2" />
        </svg>
    );
}

function DatabaseIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <ellipse cx="12" cy="5" rx="7" ry="3" />
            <path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
            <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
        </svg>
    );
}

function OrbitIcon(props: ComponentProps<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="2" />
            <path d="M3 12c5 3 13 3 18 0" />
            <path d="M3 12c5-3 13-3 18 0" />
            <path d="M12 3c-3 5-3 13 0 18" />
            <path d="M12 3c3 5 3 13 0 18" />
        </svg>
    );
}
