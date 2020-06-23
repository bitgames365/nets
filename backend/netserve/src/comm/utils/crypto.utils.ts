import { createHash } from 'crypto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CryptoUtil{
    /**
     * sha256计算哈希
     * @param plaintext 输入原文字符串
     */
    sha256(plaintext: string ): string {
        return createHash('sha256').update(plaintext).digest('hex');
    }

    /**
     * 验证sha256
     * @param plaintext 原始字符串
     * @param sha256text 哈希值
     * @return bool
     */
    checkSha256(plaintext: string, sha256text: string): boolean {
        const newSha256text = this.sha256(plaintext);
        return sha256text === newSha256text;
    }
}