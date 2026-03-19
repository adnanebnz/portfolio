"use client";

import { motion } from "framer-motion";
import { LogOut, LayoutDashboard, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/providers/auth-provider";
import { useTranslations } from "@/hooks/use-translations";

export function UserNav() {
    const { user, logout } = useAuth();
    const t = useTranslations("navigation");

    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full ml-1">
                    <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700 hover:opacity-80 transition-opacity">
                        <AvatarImage src={user.avatarUrl || ""} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1 text-sm">
                        <p className="font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/dashboard" className="cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>{t("dashboard")}</span>
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/profile" className="cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer">
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>{t("profile")}</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                    onClick={() => logout()}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("logout") || "Logout"}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
