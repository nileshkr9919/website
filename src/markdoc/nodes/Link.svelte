<script lang="ts">
    import { getContext } from 'svelte';

    export let href: string;
    export let title: string;

    const isExternal = ['http://', 'https://'].some((prefix) => href.startsWith(prefix));
    const target = isExternal ? '_blank' : undefined;
    const rel = isExternal ? 'noopener nofollow' : undefined;

    const isDocs = getContext('isDocs') ?? false;
</script>

<a
    class="aw-link is-inline {isDocs ? 'aw-paragraph-md' : 'aw-paragraph-lg'}"
    {href}
    {title}
    {target}
    {rel}><slot /></a
>
