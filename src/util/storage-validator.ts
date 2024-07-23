const VALIDITY_PERIOD_MS = 24 * 60 * 60 * 1000;

export const verific_token = (): void => {
    const now = new Date().getTime();
    const keys = Object.keys(localStorage);
    const latestTokens: { [key: string]: { timestamp: number, key: string } } = {};

    // Itera sobre todas as chaves no localStorage
    keys.forEach(key => {
        if (key.startsWith('t_')) {
            const tokenData = localStorage.getItem(key);
            if (tokenData) {
                const { timestamp } = JSON.parse(tokenData);
                const tokenTime = new Date(timestamp).getTime();

                // Verifica se o token é válido (dentro do período de validade)
                if (now - tokenTime <= VALIDITY_PERIOD_MS) {
                    const tokenType = key.split('_')[1]; 
                    if (!latestTokens[tokenType] || tokenTime > latestTokens[tokenType].timestamp) {
                        latestTokens[tokenType] = { timestamp: tokenTime, key };
                    }
                }
            }
        }
    });

    // Remove todos os tokens que não são os mais recentes
    keys.forEach(key => {
        if (key.startsWith('t_')) {
            const tokenType = key.split('_')[1];
            if (!latestTokens[tokenType] || latestTokens[tokenType].key !== key) {
                localStorage.removeItem(key);
            }
        }
    });
};
