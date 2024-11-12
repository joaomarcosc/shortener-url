import { env } from "@/env";
import type { UrlRepository } from "@/repositories/url-repository";
import { validateUrl } from "@/utils/validate-url";
import { nanoid } from "nanoid";
import { ShortWrongUrlError } from "../errors/short-wrong-url-error";

interface ShortenerUrlUseCaseParams {
  origUrl: string;
}

export class ShortenerUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute({ origUrl }: ShortenerUrlUseCaseParams) {
    const base = env.BASE_URL;
    const urlId = nanoid(6);

    if (!validateUrl(origUrl)) {
      throw new ShortWrongUrlError();
    }

    let url = await this.urlRepository.findOne({ origUrl });

    if (url) {
      return url;
    }
    const shortUrl = `${base}/${urlId}`;

    url = await this.urlRepository.create({
      origUrl,
      shortUrl,
      urlId,
      clicks: 0,
    });

    return url;
  }
}
