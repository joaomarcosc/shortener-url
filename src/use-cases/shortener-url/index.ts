import type { UrlRepository } from "@/repositories/url-repository";
import type { UserRepository } from "@/repositories/user-repository";
import { validateUrl } from "@/utils/validate-url";
import { nanoid } from "nanoid";
import { ResourceNotFoundError } from "../errors/resource-not-found";
import { ShortWrongUrlError } from "../errors/short-wrong-url-error";

interface ShortenerUrlUseCaseParams {
  origUrl: string;
  userId: string | null;
}

export class ShortenerUrlUseCase {
  constructor(
    private urlRepository: UrlRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ origUrl, userId }: ShortenerUrlUseCaseParams) {
    const urlId = nanoid(6);

    if (userId) {
      const user = await this.userRepository.findOne({ id: userId });

      if (!user) {
        throw new ResourceNotFoundError("User");
      }
    }

    if (!validateUrl(origUrl)) {
      throw new ShortWrongUrlError();
    }

    let url = await this.urlRepository.findOne({ origUrl });

    if (url) {
      return url;
    }

    url = await this.urlRepository.create({
      origUrl,
      urlId,
      clicks: 0,
      userId,
    });

    return url;
  }
}
