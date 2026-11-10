import { Form, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import PasskeyVerify from '@/components/passkey-verify';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSwitchToRegister?: () => void;
    canResetPassword?: boolean;
    status?: string;
};

export function LoginDialog({
    open,
    onOpenChange,
    onSwitchToRegister,
    canResetPassword = true,
    status,
}: Props) {
    const fieldClass =
        'border-violet-400/20 bg-[#0b1022] text-slate-100 placeholder:text-slate-500 focus-visible:ring-violet-500/40';
    const labelClass = 'text-slate-200';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-violet-400/20 bg-[#090d1f]/95 text-slate-100 shadow-[0_0_50px_rgba(124,58,237,0.18)] backdrop-blur-md sm:max-w-md [&>button]:text-slate-400 [&>button]:hover:text-white">
                <DialogHeader>
                    <DialogTitle className="text-white">Log in to your account</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Enter your email and password below to log in
                    </DialogDescription>
                </DialogHeader>

                {status && (
                    <div className="text-center text-sm font-medium text-emerald-400">
                        {status}
                    </div>
                )}

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    onSuccess={() => onOpenChange(false)}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="login-email" className={labelClass}>Email address</Label>
                                    <Input
                                        id="login-email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className={fieldClass}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="login-password" className={labelClass}>Password</Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="ml-auto text-sm text-violet-300 hover:text-violet-200"
                                                onClick={() => onOpenChange(false)}
                                            >
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <PasswordInput
                                        id="login-password"
                                        name="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        className={fieldClass}
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Checkbox id="login-remember" name="remember" className="border-violet-400/30 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600" />
                                    <Label htmlFor="login-remember" className="text-slate-300">Remember me</Label>
                                </div>

                                <Button type="submit" className="w-full border border-violet-400/30 bg-violet-600 text-white hover:bg-violet-500" disabled={processing}>
                                    {processing && <Spinner />}
                                    Log in
                                </Button>
                            </div>

                            <div className="text-center text-sm text-slate-400">
                                Don&apos;t have an account?{' '}
                                {onSwitchToRegister ? (
                                    <button
                                        type="button"
                                        className="text-violet-300 underline underline-offset-4 hover:text-violet-200"
                                        onClick={onSwitchToRegister}
                                    >
                                        Sign up
                                    </button>
                                ) : (
                                    <span>Sign up</span>
                                )}
                            </div>
                        </>
                    )}
                </Form>

                <div className="pt-1 text-slate-300 [&_*]:border-violet-400/20">
                    <PasskeyVerify />
                </div>
            </DialogContent>
        </Dialog>
    );
}
