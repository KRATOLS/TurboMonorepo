type RoutePage = {
    path: string;
    name: string;
}

export const usePageAccess = () => {
    const config = useRuntimeConfig()

    const disabledPages = computed(() =>
        config.public.disabledPages?.split(',').filter(Boolean) as string[]
    )

    const isPageEnabled = (path: string) => {
        return !disabledPages.value.some(disabled => path.includes(disabled))
    }

    const pages = [
        { path: '/', name: 'Главная' },
        { path: '/users', name: 'Пользователи' },
        { path: '/calls-search', name: 'Поиск-звонков' },
    ]

    const availablePages: RoutePage[] =  pages.filter(page => isPageEnabled(page.path))

    const navigateToPage = (path: string) => {
        if (isPageEnabled(path)) {
            return navigateTo(path)
        } else {
            console.warn(`Страница ${path} отключена`)
            return navigateTo('/')
        }
    }

    return {
        disabledPages,
        isPageEnabled,
        availablePages,
        navigateToPage
    }
}