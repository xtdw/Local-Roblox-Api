import e from 'express';
import c from 'cors';
import f from 'node-fetch';

const a = e();
const p = 8000;

a.use(c());

a.get('/profile/:u', async (r, res) => {
    const u = r.params.u;

    try {
        const idRes = await f('https://users.roblox.com/v1/usernames/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernames: [u], excludeBannedUsers: true })
        });

        if (!idRes.ok) {
            console.error(`Username ID fetch failed: ${idRes.status} ${idRes.statusText}`);
            return res.status(idRes.status).json({ error: 'Failed to find user ID for username.' });
        }

        const idData = await idRes.json();
        if (!idData.data || idData.data.length === 0 || !idData.data[0].id) {
            return res.status(404).json({ error: 'User not found or no ID returned.' });
        }
        const uI = idData.data[0].id;

        const results = await Promise.allSettled([
            f(`https://users.roblox.com/v1/users/${uI}`),
            f(`https://friends.roblox.com/v1/users/${uI}/friends/count`),
            f(`https://friends.roblox.com/v1/users/${uI}/followers/count`),
            f(`https://friends.roblox.com/v1/users/${uI}/followings/count`),
            f(`https://accountinformation.roblox.com/v1/users/${uI}/roblox-badges`),
            f(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${uI}&size=420x420&format=Png&is=false`)
        ]);

        const pD = results[0].status === 'fulfilled' && results[0].value.ok ? await results[0].value.json() : null;
        const frD = results[1].status === 'fulfilled' && results[1].value.ok ? await results[1].value.json() : null;
        const foD = results[2].status === 'fulfilled' && results[2].value.ok ? await results[2].value.json() : null;
        const flD = results[3].status === 'fulfilled' && results[3].value.ok ? await results[3].value.json() : null;
        let bD = results[4].status === 'fulfilled' && results[4].value.ok ? await results[4].value.json() : [];
        const aTD = results[5].status === 'fulfilled' && results[5].value.ok ? await results[5].value.json() : null;

        const aU = aTD && aTD.data && aTD.data.length > 0 ? aTD.data[0].imageUrl : null;

        res.json({ pD, frD, foD, flD, bD, aU });

    } catch (er) {
        console.error('Server error fetching Roblox data:', er);
        res.status(500).json({ error: 'Internal server error fetching Roblox data.', details: er.message });
    }
});

async function fetchUserListWithAvatars(uI, end) {
    let u = `https://friends.roblox.com/v1/users/${uI}/${end}?limit=100`;

    if (end === 'followers') {
        u += '&sortOrder=Desc';
    }

    const lR = await f(u);
    if (!lR.ok) {
        throw new Error(`Failed to fetch ${end} list: ${lR.status} ${lR.statusText}`);
    }
    let lD = await lR.json();
    let us = lD.data || [];

    if (us.length === 0) {
        return [];
    }

    if (!us[0].name && !us[0].displayName) {
        const uIT = us.map(ur => ur.id);
        if (uIT.length > 0) {
            const uDR = await f('https://users.roblox.com/v1/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userIds: uIT })
            });

            if (uDR.ok) {
                const uDD = await uDR.json();
                const uDM = new Map();
                if (uDD.data) {
                    uDD.data.forEach(ur => {
                        uDM.set(ur.id, ur);
                    });
                }

                us = us.map(ur => uDM.get(ur.id) || ur);
            } else {
                console.warn(`Failed to fetch user details for ${end} list: ${uDR.status} ${uDR.statusText}`);
            }
        }
    }

    const uIA = us.map(ur => ur.id);
    const aR = await f(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${uIA.join(',')}&size=100x100&format=Png&isCircular=false`);

    if (!aR.ok) {
        console.warn(`Failed to fetch avatars for ${end} list: ${aR.status} ${aR.statusText}`);

        return us.map(ur => ({ ...ur, avatarUrl: null }));
    }

    const aD = await aR.json();
    const aM = new Map();
    if (aD.data) {
        aD.data.forEach(av => {
            aM.set(av.targetId, av.imageUrl);
        });
    }

    return us.map(ur => ({
        id: ur.id,
        name: ur.name,
        displayName: ur.displayName,
        avatarUrl: aM.get(ur.id) || null
    }));
}

a.get('/friends/:uI', async (r, res) => {
    try {
        const uI = r.params.uI;
        const fr = await fetchUserListWithAvatars(uI, 'friends');
        res.json({ users: fr });
    } catch (er) {
        console.error('Error fetching friends list:', er);
        res.status(500).json({ error: er.message });
    }
});

a.get('/followers/:uI', async (r, res) => {
    try {
        const uI = r.params.uI;
        const fo = await fetchUserListWithAvatars(uI, 'followers');
        res.json({ users: fo });
    } catch (er) {
        console.error('Error fetching followers list:', er);
        res.status(500).json({ error: er.message });
    }
});

a.get('/following/:uI', async (r, res) => {
    try {
        const uI = r.params.uI;
        const fl = await fetchUserListWithAvatars(uI, 'followings');
        res.json({ users: fl });
    } catch (er) {
        console.error('Error fetching following list:', er);
        res.status(500).json({ error: er.message });
    }
});

a.listen(p, () => {
    console.log(`Proxy server running on http://localhost:${p}`);
});