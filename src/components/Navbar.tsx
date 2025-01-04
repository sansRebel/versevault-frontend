import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href='/' className='btn btn-ghost text-xl'>
            VerseVault
          </Link>

        </div>
        <div className="flex-none gap-2">

          <div className="form-control mx-auto">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-10">
                <li><Link href='/blogs'>Blogs</Link></li>
                <li><Link href='/about'>About</Link></li>
                <li><Link href='/profile'>Profile</Link></li>
                <li><Link href='/auth'>Login</Link></li>
            </ul>
          </div>

        </div>
      </div>
    );
  }
  