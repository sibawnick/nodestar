import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
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
import { store } from '@/routes/register';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSwitchToLogin?: () => void;
    passwordRules?: string;
};

export function RegisterDialog({
    open,
    onOpenChange,
    onSwitchToLogin,
    passwordRules,
}: Props) {
    const fieldClass =
        'border-violet-400/20 bg-[#0b1022] text-slate-100 placeholder:text-slate-500 focus-visible:ring-violet-500/40';
    const labelClass = 'text-slate-200';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-violet-400/20 bg-[#090d1f]/95 text-slate-100 shadow-[0_0_50px_rgba(124,58,237,0.18)] backdrop-blur-md sm:max-w-md [&>button]:text-slate-400 [&>button]:hover:text-white">
                <DialogHeader>
                    <DialogTitle className="text-white">Create an account</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Enter your details below to create your account
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    onSuccess={() => onOpenChange(false)}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="register-name" className={labelClass}>Name</Label>
                                    <Input
                                        id="register-name"
                                        type="text"
                                        required
                                        autoFocus
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Full name"
                                        className={fieldClass}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="register-email" className={labelClass}>Email address</Label>
                                    <Input
                                        id="register-email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@example.com"
                                        className={fieldClass}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="register-password" className={labelClass}>Password</Label>
                                    <PasswordInput
                                        id="register-password"
                                        required
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Password"
                                        passwordrules={passwordRules}
                                        className={fieldClass}
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="register-password-confirmation" className={labelClass}>
                                        Confirm password
                                    </Label>
                                    <PasswordInput
                                        id="register-password-confirmation"
                                        required
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Confirm password"
                                        passwordrules={passwordRules}
                                        className={fieldClass}
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button type="submit" className="w-full border border-violet-400/30 bg-violet-600 text-white hover:bg-violet-500" disabled={processing}>
                                    {processing && <Spinner />}
                                    Create account
                                </Button>
                            </div>

                            <div className="text-center text-sm text-slate-400">
                                Already have an account?{' '}
                                {onSwitchToLogin ? (
                                    <button
                                        type="button"
                                        className="text-violet-300 underline underline-offset-4 hover:text-violet-200"
                                        onClick={onSwitchToLogin}
                                    >
                                        Log in
                                    </button>
                                ) : (
                                    <span>Log in</span>
                                )}
                            </div>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
