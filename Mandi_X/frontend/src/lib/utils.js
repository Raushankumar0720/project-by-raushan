import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount)
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export function formatWeight(kg) {
    if (kg >= 1000) {
        return `${(kg / 1000).toFixed(1)} tonnes`
    }
    return `${kg} kg`
}

export function getRoleBadgeColor(role) {
    const colors = {
        farmer: 'bg-green-100 text-green-800',
        agent: 'bg-blue-100 text-blue-800',
        buyer: 'bg-purple-100 text-purple-800',
        transporter: 'bg-orange-100 text-orange-800',
        admin: 'bg-red-100 text-red-800',
    }
    return colors[role] || 'bg-gray-100 text-gray-800'
}
