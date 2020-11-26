export function makeCancelable(promise) {
  let isCanceled = false
  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then(val =>
        isCanceled ? reject(new Error({ isCanceled })) : resolve(val)
      )
      .catch(error =>
        isCanceled ? reject(new Error({ isCanceled })) : reject(error)
      )
  })

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true
    }
  }
}

export function isHex(str) {
  return (str + '').startsWith('0x')
}

export function remove0x(str) {
  if (!isHex(str)) {
    return str
  }

  return str.slice(2)
}

export function shortHash(hash = '', length = 5) {
  if (!isHex(hash)) {
    return hash
  }

  const nakedHash = remove0x(hash)
  return `0x${nakedHash.slice(0, length)}...${nakedHash.slice(nakedHash.length - length)}`
}

export function nonFunc() {
}

